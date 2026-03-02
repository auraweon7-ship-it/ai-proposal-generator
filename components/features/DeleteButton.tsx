'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GlassButton from '@/components/ui/GlassButton';

interface DeleteButtonProps {
  proposalId: string;
}

export default function DeleteButton({ proposalId }: DeleteButtonProps) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 3000);
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/proposals/${proposalId}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/proposals');
        router.refresh();
      }
    } catch {
      setDeleting(false);
      setConfirm(false);
    }
  }

  return (
    <GlassButton
      size="sm"
      variant="ghost"
      onClick={handleDelete}
      loading={deleting}
      className={confirm ? 'text-red-400 border-red-500/30' : 'text-neutral-500'}
    >
      {confirm ? '정말 삭제할까요?' : '삭제'}
    </GlassButton>
  );
}
