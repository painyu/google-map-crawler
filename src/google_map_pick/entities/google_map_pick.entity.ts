import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'google_map_pick' })
export class GoogleMapPick {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  uuid: string;
  @Column()
  name: string;
  @Column()
  job_id: string;
  @Column()
  google_id: string;
  @Column()
  address_details: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  phone_details: string;
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
  postCode: string;
  @Column()
  google_image: string;
  @Column()
  reques_param: string;
}
