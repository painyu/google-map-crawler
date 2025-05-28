import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'google_map_pick' })
export class GoogleMapPick {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  google_name: string;
  @Column()
  website: string;
  @Column()
  category: string;
  @Column()
  phone: string;
  @Column()
  full_address: string;
  @Column()
  borough: string;
  @Column()
  street: string;
  @Column()
  city: string;
  @Column()
  postal_code: string;
  @Column()
  state: string;
  @Column()
  country: string;
  @Column()
  country_code: string;
  @Column()
  latitude: string;
  @Column()
  longitude: string;
  @Column()
  email_1: string;
  @Column()
  email_1_full_name: string;
  @Column()
  email_1_title: string;
  @Column()
  email_1_phone: string;
  @Column()
  email_2: string;
  @Column()
  email_2_full_name: string;
  @Column()
  email_2_title: string;
  @Column()
  email_2_phone: string;
  @Column()
  email_3: string;
  @Column()
  email_3_full_name: string;
  @Column()
  email_3_title: string;
  @Column()
  email_3_phone: string;
  @Column()
  phone_1: string;
  @Column()
  phone_2: string;
  @Column()
  phone_3: string;
  @Column()
  facebook: string;
  @Column()
  instagram: string;
  @Column()
  linkedin: string;
  @Column()
  tiktok: string;
  @Column()
  medium: string;
  @Column()
  reddit: string;
  @Column()
  skype: string;
  @Column()
  snapchat: string;
  @Column()
  telegram: string;
  @Column()
  whatsapp: string;
  @Column()
  twitter: string;
  @Column()
  youtube: string;
  @Column()
  website_title: string;
  @Column()
  job_id: string;
}
