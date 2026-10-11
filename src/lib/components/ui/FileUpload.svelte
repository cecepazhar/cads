<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';
  import { Upload, File as FileIcon, X, CheckCircle2, AlertTriangle } from 'lucide-svelte';

  export type FileUploadVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  export type FileUploadSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface FileUploadFile {
    file: File;
    progress: number;
    status: 'uploading' | 'complete' | 'error';
    errorMessage?: string;
  }

  interface Props {
    files?: File[];
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    disabled?: boolean;
    label?: string;
    error?: string;
    variant?: FileUploadVariant;
    size?: FileUploadSize;
    class?: string;
  }

  let {
    files = $bindable([]),
    multiple = false,
    accept,
    maxSize,
    maxFiles,
    disabled = false,
    label = 'Upload files',
    error = '',
    variant = 'primary',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  let dragOver = $state(false);
  let internalFiles = $state<FileUploadFile[]>([]);
  let statusMessage = $state('');

  const dropzoneId = uid('fileupload-drop');
  const statusId = uid('fileupload-status');
  const listId = uid('fileupload-list');

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
  }

  const uploadingFiles = $derived(internalFiles.filter((f) => f.status === 'uploading'));

  function validateFile(file: File): string | null {
    if (maxSize && file.size > maxSize) {
      return `File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}.`;
    }
    if (accept) {
      const accepted = accept.split(',').map((t) => t.trim());
      const fileType = file.type;
      const fileExt = `.${file.name.split('.').pop()}`;
      const isAccepted = accepted.some(
        (a) =>
          a === fileType ||
          a === fileExt ||
          (a.endsWith('/*') && fileType.startsWith(a.replace('/*', '/')))
      );
      if (!isAccepted) {
        return `File "${file.name}" is not an accepted file type.`;
      }
    }
    return null;
  }

  function processFiles(newFiles: FileList | File[]) {
    const incoming = Array.from(newFiles);
    const totalCount = files.length + incoming.length;

    if (maxFiles && totalCount > maxFiles) {
      statusMessage = `Cannot add files. Maximum of ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed.`;
      return;
    }

    for (const file of incoming) {
      const validationError = validateFile(file);
      if (validationError) {
        statusMessage = validationError;
        return;
      }
    }

    statusMessage = '';
    files = [...files, ...incoming];

    for (const file of incoming) {
      const entry: FileUploadFile = { file, progress: 0, status: 'uploading' };
      internalFiles = [...internalFiles, entry];
      simulateProgress(entry);
    }
  }

  function simulateProgress(entry: FileUploadFile) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) {
        progress = 100;
        entry.progress = 100;
        entry.status = 'complete';
        internalFiles = [...internalFiles];
        clearInterval(interval);
      } else {
        entry.progress = Math.round(progress);
        internalFiles = [...internalFiles];
      }
    }, 200);
  }

  function removeFile(index: number) {
    const removed = files[index];
    files = files.filter((_, i) => i !== index);
    internalFiles = internalFiles.filter((f) => f.file !== removed);
    statusMessage = '';
  }

  function handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      processFiles(input.files);
      input.value = '';
    }
  }

  function triggerFileInput() {
    const input = document.getElementById(dropzoneId + '-input') as HTMLInputElement | null;
    input?.click();
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) dragOver = true;
  }

  function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) dragOver = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragOver = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragOver = false;
    if (disabled || !e.dataTransfer) return;
    processFiles(e.dataTransfer.files);
  }

  const variantClasses: Record<FileUploadVariant, string> = {
    primary:
      'bg-[var(--ca-surface)] border-[var(--ca-border)] hover:border-[var(--ca-brand)]',
    outline:
      'bg-transparent border-[var(--ca-border)] hover:border-[var(--ca-brand)]',
    ghost:
      'bg-transparent border-transparent hover:border-[var(--ca-border)]',
  };

  const sizeClasses: Record<FileUploadSize, string> = {
    sm: 'p-4 text-xs',
    md: 'p-6 text-sm',
    lg: 'p-8 text-base',
  };
</script>

<div class="flex flex-col gap-2 w-full {customClass}">
  {#if label}
    <span class="text-xs font-medium text-[var(--ca-text-secondary)]">{label}</span>
  {/if}

  <button
    type="button"
    id={dropzoneId}
    aria-label={label || 'File upload drop zone'}
    {disabled}
    onclick={triggerFileInput}
    ondragover={handleDragOver}
    ondragenter={handleDragEnter}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
    class="relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed
      {variantClasses[variant]} {sizeClasses[size]}
      transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
      {dragOver ? 'border-[var(--ca-brand)] bg-[var(--ca-brand)]/5' : ''}
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
  >
    <input
      type="file"
      id="{dropzoneId}-input"
      class="sr-only"
      {multiple}
      {accept}
      {disabled}
      onchange={handleInputChange}
      aria-hidden="true"
      tabindex="-1"
    />

    <Upload class="h-8 w-8 text-[var(--ca-text-muted)] {dragOver ? 'text-[var(--ca-brand)]' : ''}" />
    <span class="text-[var(--ca-text-secondary)]">
      Drag and drop files here, or <span class="text-[var(--ca-brand)] font-medium">browse</span>
    </span>
    {#if maxSize}
      <span class="text-[11px] text-[var(--ca-text-muted)]">Maximum file size: {formatFileSize(maxSize)}</span>
    {/if}
  </button>

  <div
    id={statusId}
    aria-live="polite"
    class="text-[11px] min-h-[1rem]"
  >
    {#if error}
      <span class="text-rose-400 flex items-center gap-1">
        <AlertTriangle class="h-3 w-3 shrink-0" />
        {error}
      </span>
    {:else if statusMessage}
      <span class="text-rose-400 flex items-center gap-1">
        <AlertTriangle class="h-3 w-3 shrink-0" />
        {statusMessage}
      </span>
    {/if}
  </div>

  {#if internalFiles.length > 0}
    <ul role="list" id={listId} class="flex flex-col gap-1.5">
      {#each internalFiles as entry, i (entry.file.name + i)}
        <li
          role="listitem"
          class="flex items-center gap-3 rounded-lg border border-[var(--ca-border)] bg-[var(--ca-surface-elevated)] px-3 py-2"
        >
          <FileIcon class="h-4 w-4 shrink-0 text-[var(--ca-text-muted)]" />

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="truncate text-xs text-[var(--ca-text-primary)]">{entry.file.name}</span>
              <span class="text-[11px] text-[var(--ca-text-muted)] shrink-0">
                {formatFileSize(entry.file.size)}
              </span>
            </div>

            {#if entry.status === 'uploading'}
              <div
                role="progressbar"
                aria-valuenow={entry.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Upload progress for {entry.file.name}"
                class="mt-1 h-1 w-full overflow-hidden rounded-full bg-[var(--ca-surface-subtle)]"
              >
                <div
                  class="h-full bg-[var(--ca-brand)] transition-all duration-300"
                  style="width: {entry.progress}%"
                ></div>
              </div>
            {/if}
          </div>

          {#if entry.status === 'complete'}
            <CheckCircle2 class="h-4 w-4 shrink-0 text-[var(--ca-success)]" />
          {:else if entry.status === 'error'}
            <AlertTriangle class="h-4 w-4 shrink-0 text-[var(--ca-danger)]" />
          {/if}

          <button
            type="button"
            aria-label="Remove {entry.file.name}"
            onclick={() => removeFile(i)}
            class="shrink-0 p-0.5 rounded text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
          >
            <X class="h-3.5 w-3.5" />
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>