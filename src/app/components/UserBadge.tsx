'use client';

import { useUserStore } from '../../store/userStore';

export default function UserBadge() {
  const email = useUserStore((state) => state.email);

  if (!email) return null;

  return (
    <span className="text-sm text-gray-500">
      (클라이언트 store 확인: {email})
    </span>
  );
}