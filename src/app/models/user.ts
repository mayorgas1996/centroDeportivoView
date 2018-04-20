export class User{
  constructor(
    public ID_USUARIO:string,
    public NOMBRE:string,
    public PASSWORD:string,
    public EMAIL:string,
    public SEXO:string,
    public FECHA_NAC:string,
    public TELEFONO:string,
    public DOCUMENTACION:string,
    public IBAN:string,
    public OBSERVACIONES:string,
    public DIRECCION:string,
    public MUNICIPIO:string,
    public PROVINCIA:string,
    public ACTIVO:boolean,
    public ID_PLAN:string,
    public FECHA_FIN:string,
    public NOMBRE_PLAN:string
  )
  { }

}
