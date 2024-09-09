export interface Usuario { 
    id?: number | null;         
    cod_interno?: string | null;
    empresa_id?: number | null;         
    nome: string;       
    email: string; 
    telefone: string; 
    password: string; 
    interno: boolean;    
    ativo: boolean;    
  }