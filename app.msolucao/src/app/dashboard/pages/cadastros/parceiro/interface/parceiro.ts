export interface Parceiro { 
    id?: number | null;         
    cod_interno?: string | null;
    empresa_id?: number | null;  
    cgc: string;         
    nome: string;       
    plano: string;      
    lmt_trava: number | null;    
    lmt_mes: number | null;     
    grupo_id?: number | null;  
    grupo?: string | null;  
    acesso?: boolean;
    ativo: boolean;     
  }