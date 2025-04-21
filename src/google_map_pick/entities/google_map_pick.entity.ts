import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'google_map_pick' })
export class GoogleMapPick {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  google_id: string;

  @Column()
  google_name: string;

  @Column()
  phone: string;

  @Column()
  emails: string;

  @Column()
  labels: string;

  @Column()
  website: string;

  @Column()
  country: string;

  @Column()
  province: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  street: string;

  @Column()
  address: string;

  @Column()
  address_details: string;

  @Column()
  postCode: string;

  @Column()
  job_id: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;
}
