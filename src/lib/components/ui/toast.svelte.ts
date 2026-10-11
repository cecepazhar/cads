export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

interface PendingTimeout {
  timeoutId: ReturnType<typeof setTimeout>;
  remaining: number;
  startedAt: number;
}

class ToastStore {
  toasts = $state<ToastMessage[]>([]);
  private pending = new Map<string, PendingTimeout>();

  show(data: Omit<ToastMessage, 'id'>) {
    const id = Math.random().toString(36).substring(2, 9);
    const item: ToastMessage = { ...data, id };
    this.toasts = [...this.toasts, item];

    const dur = data.duration ?? 4000;
    if (dur > 0) {
      this.startTimer(id, dur);
    }
  }

  private startTimer(id: string, duration: number) {
    const timeoutId = setTimeout(() => {
      this.pending.delete(id);
      this.remove(id);
    }, duration);
    this.pending.set(id, { timeoutId, remaining: duration, startedAt: Date.now() });
  }

  pause(id: string) {
    const p = this.pending.get(id);
    if (!p) return;
    clearTimeout(p.timeoutId);
    p.remaining -= Date.now() - p.startedAt;
  }

  resume(id: string) {
    const p = this.pending.get(id);
    if (!p || p.remaining <= 0) return;
    const remaining = p.remaining;
    this.pending.delete(id);
    this.startTimer(id, remaining);
  }

  success(title: string, description?: string) {
    this.show({ title, description, type: 'success' });
  }

  error(title: string, description?: string) {
    this.show({ title, description, type: 'error' });
  }

  info(title: string, description?: string) {
    this.show({ title, description, type: 'info' });
  }

  warning(title: string, description?: string) {
    this.show({ title, description, type: 'warning' });
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    const p = this.pending.get(id);
    if (p) {
      clearTimeout(p.timeoutId);
      this.pending.delete(id);
    }
  }
}

export const toast = new ToastStore();