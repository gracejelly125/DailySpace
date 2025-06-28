import type { User } from '@/types/types';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const getId = async (): Promise<User['id'] | null> => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return null;
  }

  return userData.user.id;
};
