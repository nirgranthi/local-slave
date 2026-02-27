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
    mirostat: 2.0,
    mirostat_tau: 5.0,
    mirostat_eta: 0.1,
    n_probs: 0
}

const modelConfigDefault = {
    n_ctx: 65536,
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
    { id: 'temp', label: 'Temp', hint: 'The Chaos Slider. High Temp = The AI is drunk and adventurous. Low Temp = The AI is a boring accountant who never takes risks.', type: 'range', value: config.temp, min: 0.0, max: 2.0 },
    { id: 'dynatemp_range', label: 'Dynamic temp range', hint: 'The Mood Swing. If Temp is 1.0 and Range is 0.5, the AI can flip-flop between 0.5 and 1.5 depending on how "sure" it feels.', type: 'range', value: config.dynatemp_range, min: 0.0, max: 2.0 },
    { id: 'dynatemp_exponent', label: 'Dynamic Temp Exponent', hint: "The Aggression Factor. How hard the AI pushes toward the higher temperature when it's feeling creative.", type: 'range', value: config.dynatemp_exponent, min: 0.0, max: 2.0 },
    { id: 'top_p', label: 'top_p', hint: 'cuts off the list at a fixed number (e.g., "Give me the top 20 choices").', type: 'range', value: config.top_p, min: '', max: '' },
    { id: 'top_k', label: 'top_k', hint: 'cuts off the list once the total confidence reaches a certain point (e.g., "Give me enough choices to be 90% sure").', type: 'range', value: config.top_k, min: '', max: '' },
    { id: 'min_p', label: 'min_p', hint: 'The "No Losers" Rule. It kicks out any word that has a probability less than (Min-P)% of the top word. It’s like saying, "If the best word is 90% likely, dont even look at anything below 5%."', type: 'range', value: config.min_p, min: 0.0, max: 1.0 },
    { id: 'typical_p', label: 'typical_p', hint: 'The "Natural" Filter. It picks words that are "normally" used in this context. It prevents the AI from being too robotic or too insane.', type: 'range', value: config.typical_p, min: 0.0, max: 1.0 },
    { id: 'penalty_repeat', label: 'Punishment for repitition', hint: 'The Loop Breaker. It makes the AI "hate" words it just used. High value = "Stop saying the same thing over and over!"', type: 'range', value: config.penalty_repeat, min: 1.0, max: 2.0 },
    { id: 'penalty_freq', label: "Punishment for word's frequency", hint: "The Vocabulary Expander. It punishes words based on how often they've appeared in the whole chat. It forces the AI to use different words.", type: 'range', value: config.penalty_freq, min: 0.0, max: 2.0 },
    { id: 'penalty_present', label: 'Punishment for word occuring twice', hint: 'The "Once is Enough" Rule. A flat penalty for any word that has appeared at all. It’s like saying, "You’ve said that once, try a different word now."', type: 'range', value: config.penalty_present, min: 0.0, max: 2.0 },
    { id: 'mirostat', label: 'Surprise level', hint: "The Auto-Pilot. A smart system that automatically adjusts the internal settings to keep the text quality consistent so you don't have to mess with Temp.", type: 'range', value: config.mirostat, min: 0.0, max: 2.0 },
    { id: 'mirostat_tau', label: 'Desired perplexity', hint: 'The Complexity Goal. How "interesting" or difficult you want the text to be. Higher Tau = more complex/surprising sentences.', type: 'range', value: config.mirostat_tau, min: 0.0, max: 10.0 },
    { id: 'mirostat_eta', label: 'Learning rate', hint: 'The Learning Speed. How quickly Mirostat reacts when the text starts getting too boring or too chaotic.', type: 'range', value: config.mirostat_eta, min: 0.0, max: 1.0 },
    { id: 'n_probs', label: 'Word choice', hint: "The Behind-the-Scenes. This doesn't change the output; it just shows you the 'top N' guesses the AI had. It's for debugging your own sanity.", type: 'range', value: config.n_probs, min: 0.0, max: 10.0 }
]
return promptConfigControlPanel
}
function modelConfigCPF (config) {
    const modelConfigControlPanel = [
    { id: 'n_ctx', label: 'Context length', type: 'range', value: config.n_ctx, min: 0.0, max: 1024000.0 },
    { id: 'n_batch', label: 'n_batch', type: 'range', value: config.n_batch, min: 0.0, max: 1024000.0 },
    { id: 'n_threads', label: 'n_threads', type: 'range', value: config.n_threads, min: 1, max: 32 },
    { id: 'seed', label: 'seed', type: 'range', value: config.seed, min: -1, max: 999999999 },
    { id: 'cache_type_k', label: 'cache_type_k', type: 'select', value: config.cache_type_k, min: '', max: '', options: ['f32', 'f16', 'q8_0', 'q5_1', 'q5_0', 'q4_1', 'q4_0'] },
    { id: 'cache_type_v', label: 'cache_type_v', type: 'select', value: config.cache_type_v, min: '', max: '', options: ['f32', 'f16', 'q8_0', 'q5_1', 'q5_0', 'q4_1', 'q4_0'] },
    { id: 'flash_attn', label: 'flash_attn', type: 'toggle', value: config.flash_attn, min: '', max: '' },
    { id: 'embedidings', label: 'embeddings', type: 'toggle', value: config.embeddings, min: '', max: '' },
    { id: 'offload_kqv', label: 'offload_kqv', type: 'toggle', value: config.offload_kqv, min: '', max: '' }
]
return modelConfigControlPanel
}


export { promptConfigDefault, modelConfigDefault, promptConfigCPF, modelConfigCPF }