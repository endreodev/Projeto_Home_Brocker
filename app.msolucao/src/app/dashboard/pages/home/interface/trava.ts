export interface Trava {
    current_page: number;    
    pages: number;     
    total: number;     
    travas: Travas;     
}

export interface Travas {
    id: number;          
    empresa_id: number; 
    parceiro_id: number;
    parceiro_nome: string; 
    usuario_id: number;  
    usuario_nome: string;
    produto_id: number;  
    quantidade: number; 
    preco_unitario: number;
    preco_total: number; 
    status: string;      
    integrado: string;
    created_at: string;  
    updated_at: string;  
}


export interface Integracao {
    
    id: number;
    id_trava: number;
    codcontrole: number;
    mensagem: string;
    sucesso: string; 
    created_at: string;
    updated_at: string;
}