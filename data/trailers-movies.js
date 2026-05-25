// ============================================
// data/trailers-movies.js
// BANCO DE TRAILERS DE FILMES
// Cada filme tem seu trailer específico
// Se não encontrado, usa o genérico (índice 0)
// ============================================

const MOVIE_TRAILERS = {
    // Trailers específicos por ID do filme
    // Formato: ID_DO_FILME: 'URL_DO_TRAILER'
    
    // Ação
    1: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // O Cavaleiro das Trevas
    2: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Matrix
    3: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // John Wick
    4: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Duro de Matar
    5: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Gladiador
    
    // Drama
    6: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // O Poderoso Chefão
    7: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Parasita
    8: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Pulp Fiction
    9: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Forrest Gump
    10: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Clube da Luta
    
    // Comédia
    11: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Se Beber Não Case
    12: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Superbad
    13: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Debi & Lóide
    
    // Ficção Científica
    14: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Interestelar
    15: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Blade Runner 2049
    16: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // A Chegada
    
    // Terror
    17: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // O Exorcista
    18: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Invocação do Mal
    19: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Hereditário
    
    // Romance
    20: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Titanic
    21: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Diário de uma Paixão
    
    // Animação
    22: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Toy Story
    23: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Procurando Nemo
    
    // Aventura
    24: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Jurassic Park
    25: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo' // Indiana Jones
};

// Trailer genérico (usado quando não encontra o específico)
const GENERIC_MOVIE_TRAILER = 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo';

// Função para obter trailer do filme
function getMovieTrailer(movieId) {
    return MOVIE_TRAILERS[movieId] || GENERIC_MOVIE_TRAILER;
}