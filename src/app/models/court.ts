export class Court{
  constructor(
    public ID_PISTA:string,
    public NOMBRE:string,
    public PRECIO_SIN_LUZ:string,
    public PRECIO_CON_LUZ:string,
    public HORA_APERTURA: string,
    public HORA_CIERRE: string,
    public HORA_INICIO_LUZ: string,
    public ACTIVO:boolean

  )
  { }

}
