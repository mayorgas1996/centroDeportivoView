import { Exercise  } from './exercise';

export class Routine{
  constructor(
    public ID_RUTINA:string,
    public NOMBRE:string,
    public DIFICULTAD:string,
    public DIAS:number,
    public EJERCICIOS:any[],
    public SERIES:any[],
    public REPETICIONES:any[]
  )
  {
    this.EJERCICIOS = [];
    this.SERIES = [];
    this.REPETICIONES = [];
  }

}
