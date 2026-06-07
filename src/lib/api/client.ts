import { ScheduleItem, Testimonial, Promotion } from '@/types';

const API_BASE_URL = process.env.APP_API_URL || 'https://api.talleresmogran.com';

export async function getSchedules(modalidad?: 'virtual' | 'presencial'): Promise<ScheduleItem[] | null> {
  try {
    const url = modalidad
      ? `${API_BASE_URL}/v1/horarios?modalidad=${modalidad}`
      : `${API_BASE_URL}/v1/horarios`;

    const res = await fetch(url, {
      next: { revalidate: 300 },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('API down');
    return res.json();
  } catch {
    return null;
  }
}

export async function getPromociones(): Promise<Promotion[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/v1/promociones-activas`, {
      next: { revalidate: 300 },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('API down');
    return res.json();
  } catch {
    return null;
  }
}

export async function getTestimonios(limit = 3): Promise<Testimonial[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/v1/testimonios?limit=${limit}`, {
      next: { revalidate: 300 },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('API down');
    return res.json();
  } catch {
    return null;
  }
}
