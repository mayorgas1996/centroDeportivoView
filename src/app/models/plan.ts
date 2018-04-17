export class Plan{
  constructor(
    public ID_PLAN: string,
    public NOMBRE: string,
    public GASTOS_INSCRIPCION: string,
    public COSTE_MENSUAL: string,
    public EDAD_MIN: number,
    public EDAD_MAX: number,
    public ACCESO_ZONA_ACUATICA: boolean,
    public SABADOS_Y_DOMINGOS: boolean
  ){

  }
}
