import { Button } from "@/components/ui/button";

export function MiBoton() {
  return (
    <div className="flex flex-col gap-3">
      <Button variant="black">Guardar cambios</Button>
      <Button variant="secondaryFlat">Cancelar</Button>
      <Button variant="black" className="w-full">Continuar</Button>
      <Button variant="black">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 5v14m-7-7h14" />
        </svg>
        Crear
      </Button>
      <Button variant="outlineFlat">Más opciones</Button>
      <Button variant="black" disabled>
        Cargando...
      </Button>
    </div>
  );
}

export default MiBoton;


