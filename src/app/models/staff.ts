export class Staff{
  constructor(
    public ID_TECNICO:string,
    public NOMBRE:string,
    public EMAIL:string,
    public PASSWORD: string,
    public FECHA_NACIMIENTO:string,
    public MUNICIPIO:string,
    public PROVINCIA:string,
    public DOMICILIO:string,
    public TELEFONO:string,
    public DOCUMENTACION:string,
    public SALARIO:string,
    public ID_CENTRO:string,
    public ADMINISTRATIVO:boolean,
    public DEPORTIVO:boolean,
    public ESPECIALIDAD: string,
    public ACTIVO: boolean,
    public BAJA: boolean

  )
  { }

}
