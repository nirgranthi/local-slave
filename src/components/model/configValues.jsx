const promptConfigDefault = {
    temp: 0.8,
    dynatemp_range: 0.0,
    dynatemp_exponent: 1.0,
    top_p: 0.95,
    top_k: 40,
    min_p: 0.05,
    typical_p: 1.0,
    penalty_repeat: 1.0,
    penalty_freq: 0.0,
    penalty_present: 0.0,
    mirostat: 0,
    mirostat_tau: 5.0,
    mirostat_eta: 0.1,
    n_probs: 0
}

const modelConfigDefault = {
    n_ctx: 8192,
    n_batch: 1024,
    n_threads: 15,
    seed: -1,
    cache_type_k: "f16",
    cache_type_v: 'f16',
    flash_attn: false,
    embeddings: false,
    offload_kqv: false
}
function promptConfigCPF (config) {
    const promptConfigControlPanel = [
    { id: 'temp', label: 'Temp', type: 'range', value: config.temp, min: 0.0, max: 2.0 },
    { id: 'dynatemp_range', label: 'Dynamic temp range', type: 'range', value: config.dynatemp_range, min: 0.0, max: 2.0 },
    { id: 'dynatemp_exponent', label: 'Dynamic Temp Exponent', type: 'range', value: config.dynatemp_exponent, min: 0.0, max: 2.0 },
    { id: 'top_p', label: 'top_p', type: 'range', value: config.top_p, min: '', max: '' },
    { id: 'top_k', label: 'top_k', type: 'range', value: config.top_k, min: '', max: '' },
    { id: 'min_p', label: 'min_p', type: 'range', value: config.min_p, min: 0.0, max: 1.0 },
    { id: 'typical_p', label: 'typical_p', type: 'range', value: config.typical_p, min: 0.0, max: 1.0 },
    { id: 'penalty_repeat', label: 'Punishment for repitition', type: 'range', value: config.penalty_repeat, min: 1.0, max: 2.0 },
    { id: 'penalty_freq', label: "Punishment for word's frequency", type: 'range', value: config.penalty_freq, min: 0.0, max: 2.0 },
    { id: 'penalty_present', label: 'Punishment for word occuring twice', type: 'range', value: config.penalty_present, min: 0.0, max: 2.0 },
    { id: 'mirostat', label: 'Surprise level', type: 'range', value: config.mirostat, min: 0.0, max: 2.0 },
    { id: 'mirostat_tau', label: '', type: 'range', value: config.mirostat_tau, min: 0.0, max: 10.0 },
    { id: 'mirostat_eta', label: '', type: 'range', value: config.mirostat_eta, min: 0.0, max: 1.0 },
    { id: 'n_probs', label: '', type: 'range', value: config.n_probs, min: 0.0, max: 10.0 }
]
return promptConfigControlPanel
}


const modelConfigControlPanel = [
    { id: '', label: '', type: '', value: '', min: '', max: '' },
    { id: '', label: '', type: '', value: '', min: '', max: '' },
    { id: '', label: '', type: '', value: '', min: '', max: '' },
    { id: '', label: '', type: '', value: '', min: '', max: '' },
    { id: '', label: '', type: '', value: '', min: '', max: '' },
    { id: '', label: '', type: '', value: '', min: '', max: '' },
    { id: '', label: '', type: '', value: '', min: '', max: '' },
    { id: '', label: '', type: '', value: '', min: '', max: '' },
    { id: '', label: '', type: '', value: '', min: '', max: '' },
]

export { promptConfigDefault, modelConfigDefault, promptConfigCPF, modelConfigControlPanel }