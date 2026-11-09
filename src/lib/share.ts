import { Share } from 'react-native';

import { resume } from '@/data/resume';

/** Opens the native share sheet with name, headline and LinkedIn profile. */
export async function shareProfile() {
  const { profile, contact } = resume;
  try {
    await Share.share({
      title: profile.name,
      message: `${profile.name} — ${profile.headline}\n${contact.linkedIn.url}`,
    });
  } catch {
    // User dismissed or sharing is unavailable — nothing to do.
  }
}
