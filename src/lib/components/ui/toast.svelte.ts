export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

class ToastStore {
  toasts = $state<ToastMessage[]>([]);

  show(toast: Omit<ToastMessage, 'id'>) {
    const id = Math.random().toString(36).substring(2, 9);
    const item: ToastMessage = { ...toast, id };
    this.toasts = [...this.toasts, item];

    const dur = toast.duration ?? 4000;
    if (dur > 0) {
      setTimeout(() => this.remove(id), dur);
    }
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
  }
}

export const toast = new ToastStore();
