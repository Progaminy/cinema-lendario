// ============================================
// js/config.js
// CONFIGURAÇÃO GLOBAL DO CINEMA LENDÁRIO
// ============================================

const CONFIG = {
    // API TMDB
    TMDB_API_KEY: '352d9955ac54be0e494fca37b4819247',
    TMDB_BASE_URL: 'https://api.themoviedb.org/3',
    TMDB_IMAGE_URL: 'https://image.tmdb.org/t/p/w500',
    TMDB_IMAGE_ORIGINAL: 'https://image.tmdb.org/t/p/original',
    
    // Supabase Videos
    SUPABASE_VIDEOS: {
        assistir: [
            'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg'
        ]
    },
    
    // Admin
    ADMIN_CODE: 'luz299792456',
    
    // App
    APP_NAME: 'Cinema Lendário',
    APP_VERSION: '2.0.0'
};

console.log('⚙️ Configuração carregada');