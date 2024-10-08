import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({name: "category"})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[];

}
