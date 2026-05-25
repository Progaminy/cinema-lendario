// ============================================
// data/trailers-series.js
// BANCO DE TRAILERS DE SÉRIES
// Cada série tem seu trailer específico
// ============================================

const SERIES_TRAILERS = {
    // Trailers específicos por ID da série
    101: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Breaking Bad
    102: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo', // Stranger Things
    103: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo' // Game of Thrones
};

// Trailer genérico para séries
const GENERIC_SERIES_TRAILER = 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v12.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxMi5tcDQiLCJpYXQiOjE3Nzk3MTExMjAsImV4cCI6NDkzMzMxMTEyMH0.u4OMnKwApQWKXGBP5J201Htz8ym6s42qAr9tay-EHZo';

// Função para obter trailer da série
function getSeriesTrailer(seriesId) {
    return SERIES_TRAILERS[seriesId] || GENERIC_SERIES_TRAILER;
}