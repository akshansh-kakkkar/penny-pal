"use client";
type MonthlyStat = {
    month : string;
    year : number;
    amount : number;
}
type Props = {
    data : MonthlyStat[];
    width? : number;
    height? : number
}
