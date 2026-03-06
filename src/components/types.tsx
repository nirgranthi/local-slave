export interface chatMessagesProps {
    id: string,
    message: string,
    sender: string
};

export interface sessionProps {
    title: chatMessagesProps['message'],
    sessionId: number,
    history: chatMessagesProps[]
}

export interface progressDetail {
    progress: number,
    detail: string
};

export const cache_type_options = ['f32', 'f16', 'q8_0', 'q5_1', 'q5_0', 'q4_1', 'q4_0'] as const;

export type cacheTypeOptions = typeof cache_type_options[number];

export interface promptConfigDefaultProps {
    temp: number,
    dynatemp_range: number,
    dynatemp_exponent: number,
    top_p: number,
    top_k: number,
    min_p: number,
    typical_p: number,
    penalty_repeat: number,
    penalty_freq: number,
    penalty_present: number,
    mirostat: number,
    mirostat_tau: number,
    mirostat_eta: number,
    n_probs: number
};

export interface modelConfigDefaultProps {
    n_ctx: number,
    n_batch: number,
    n_threads: number,
    seed: number,
    cache_type_k: cacheTypeOptions,
    cache_type_v: cacheTypeOptions,
    flash_attn: boolean,
    embeddings: boolean,
    offload_kqv: boolean
};

