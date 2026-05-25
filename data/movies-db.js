// ============================================
// data/movies-db.js
// BANCO COMPLETO DE FILMES
// Cada filme com seu vídeo específico
// ============================================

const moviesDB = {
    'Ação': [
        {
            id: 1,
            title: 'O Cavaleiro das Trevas',
            year: 2008,
            rating: 9.0,
            poster: '/qJ2tW6WMUDux911BytEMqTzQwZ9.jpg',
            desc: 'Batman enfrenta o Coringa, um gênio do crime que mergulha Gotham City no caos. Com a ajuda do Tenente Gordon e do promotor Harvey Dent, Batman precisa deter o palhaço psicótico antes que a cidade entre em colapso total.',
            director: 'Christopher Nolan',
            cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Gary Oldman', 'Michael Caine', 'Morgan Freeman'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Ação',
            tmdbId: 155
        },
        {
            id: 2,
            title: 'Matrix',
            year: 1999,
            rating: 8.7,
            poster: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
            desc: 'Um programador de computador descobre que o mundo em que vive é uma simulação virtual criada por máquinas inteligentes. Ele se junta a um grupo de rebeldes para libertar a humanidade da Matrix.',
            director: 'Lana Wachowski, Lilly Wachowski',
            cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Ação',
            tmdbId: 603
        },
        {
            id: 3,
            title: 'John Wick',
            year: 2014,
            rating: 7.4,
            poster: '/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg',
            desc: 'Um ex-assassino de aluguel sai da aposentadoria quando um grupo de criminosos invade sua casa, rouba seu carro e mata seu cachorro, um presente de sua falecida esposa. Agora, nada vai detê-lo.',
            director: 'Chad Stahelski',
            cast: ['Keanu Reeves', 'Michael Nyqvist', 'Alfie Allen', 'Willem Dafoe'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Ação',
            tmdbId: 245891
        },
        {
            id: 4,
            title: 'Duro de Matar',
            year: 1988,
            rating: 7.8,
            poster: '/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg',
            desc: 'O policial de Nova York John McClane visita sua esposa em Los Angeles durante o Natal. Quando um grupo de terroristas toma o controle do prédio, ele se torna a única esperança dos reféns.',
            director: 'John McTiernan',
            cast: ['Bruce Willis', 'Alan Rickman', 'Bonnie Bedelia'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Ação',
            tmdbId: 562
        },
        {
            id: 5,
            title: 'Gladiador',
            year: 2000,
            rating: 8.5,
            poster: '/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
            desc: 'Um general romano é traído pelo filho do imperador, vê sua família morta e é vendido como escravo. Como gladiador, ele busca vingança no Coliseu de Roma contra o imperador corrupto.',
            director: 'Ridley Scott',
            cast: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen', 'Oliver Reed'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Ação',
            tmdbId: 98
        }
    ],
    'Drama': [
        {
            id: 6,
            title: 'O Poderoso Chefão',
            year: 1972,
            rating: 9.2,
            poster: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
            desc: 'A saga da família Corleone no submundo do crime organizado. Don Vito Corleone, o patriarca, precisa passar seu legado para seu filho relutante, Michael, após uma tentativa de assassinato.',
            director: 'Francis Ford Coppola',
            cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall', 'Diane Keaton'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Drama',
            tmdbId: 238
        },
        {
            id: 7,
            title: 'Parasita',
            year: 2019,
            rating: 8.5,
            poster: '/igw938inb6Fy0YVcoIxmQ7HJwYi.jpg',
            desc: 'Uma família pobre se infiltra na vida de uma família rica, conseguindo empregos como tutores, motoristas e governantas. Mas as coisas tomam um rumo inesperado e sombrio quando descobrem um segredo no porão.',
            director: 'Bong Joon-ho',
            cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Drama',
            tmdbId: 496243
        },
        {
            id: 8,
            title: 'Pulp Fiction',
            year: 1994,
            rating: 8.9,
            poster: '/plnlrtBUULT0rh3Xsjmpubiso3L.jpg',
            desc: 'Várias histórias se entrelaçam no submundo criminal de Los Angeles: dois assassinos filosóficos, um boxeador em fuga, a esposa de um mafioso e um casal assaltando um restaurante.',
            director: 'Quentin Tarantino',
            cast: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman', 'Bruce Willis', 'Tim Roth'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Drama',
            tmdbId: 680
        },
        {
            id: 9,
            title: 'Forrest Gump',
            year: 1994,
            rating: 8.8,
            poster: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
            desc: 'A vida extraordinária de um homem simples do Alabama que testemunha e involuntariamente influencia momentos históricos dos EUA, sempre correndo em busca de seu amor de infância, Jenny.',
            director: 'Robert Zemeckis',
            cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise', 'Sally Field'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Drama',
            tmdbId: 13
        },
        {
            id: 10,
            title: 'Clube da Luta',
            year: 1999,
            rating: 8.8,
            poster: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
            desc: 'Um homem insone e um vendedor de sabão criam um clube secreto de luta que se transforma em um movimento anarquista, revelando uma surpreendente verdade sobre suas identidades.',
            director: 'David Fincher',
            cast: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter', 'Jared Leto'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Drama',
            tmdbId: 550
        }
    ],
    'Comédia': [
        {
            id: 11,
            title: 'Se Beber, Não Case!',
            year: 2009,
            rating: 7.7,
            poster: '/8aKcKTqMcFgQ2m9qYgPQZg5JvLb.jpg',
            desc: 'Três amigos acordam após uma despedida de solteiro em Las Vegas sem lembrar de nada. O noivo desapareceu e eles precisam refazer seus passos para encontrá-lo antes do casamento.',
            director: 'Todd Phillips',
            cast: ['Bradley Cooper', 'Ed Helms', 'Zach Galifianakis', 'Justin Bartha'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Comédia',
            tmdbId: 18785
        },
        {
            id: 12,
            title: 'Superbad - É Hoje',
            year: 2007,
            rating: 7.6,
            poster: '/ek8e8txUy9DkFcFmJmN8KFJKoL8.jpg',
            desc: 'Dois adolescentes inseparáveis tentam comprar bebida para uma festa antes do último dia de aula, enfrentando situações hilárias e policiais atrapalhados no caminho.',
            director: 'Greg Mottola',
            cast: ['Jonah Hill', 'Michael Cera', 'Christopher Mintz-Plasse', 'Emma Stone'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Comédia',
            tmdbId: 8363
        },
        {
            id: 13,
            title: 'Debi & Lóide',
            year: 1994,
            rating: 7.3,
            poster: '/b8i2mN6x1hbcQqO4pBAagakpFGP.jpg',
            desc: 'Dois amigos atrapalhados cruzam os Estados Unidos para devolver uma mala esquecida, sem saber que dentro dela há dinheiro de um resgate e que estão sendo perseguidos.',
            director: 'Peter Farrelly',
            cast: ['Jim Carrey', 'Jeff Daniels', 'Lauren Holly'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Comédia',
            tmdbId: 8467
        }
    ],
    'Ficção Científica': [
        {
            id: 14,
            title: 'Interestelar',
            year: 2014,
            rating: 8.6,
            poster: '/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg',
            desc: 'Num futuro onde a Terra está morrendo, um grupo de astronautas viaja através de um buraco de minhoca em busca de um novo planeta habitável para salvar a humanidade da extinção.',
            director: 'Christopher Nolan',
            cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Ficção Científica',
            tmdbId: 157336
        },
        {
            id: 15,
            title: 'Blade Runner 2049',
            year: 2017,
            rating: 8.0,
            poster: '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
            desc: 'Trinta anos após os eventos do primeiro filme, um novo blade runner descobre um segredo enterrado há décadas que pode mergulhar o que resta da sociedade no caos.',
            director: 'Denis Villeneuve',
            cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas', 'Jared Leto'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Ficção Científica',
            tmdbId: 335984
        },
        {
            id: 16,
            title: 'A Chegada',
            year: 2016,
            rating: 7.9,
            poster: '/hLudzvGfpiYJlF1QzArWbJbQVkS.jpg',
            desc: 'Quando misteriosas naves alienígenas pousam em vários pontos da Terra, uma linguista é recrutada para decifrar sua linguagem e descobrir suas verdadeiras intenções antes que seja tarde.',
            director: 'Denis Villeneuve',
            cast: ['Amy Adams', 'Jeremy Renner', 'Forest Whitaker'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Ficção Científica',
            tmdbId: 329865
        }
    ],
    'Terror': [
        {
            id: 17,
            title: 'O Exorcista',
            year: 1973,
            rating: 8.1,
            poster: '/4ucLGcXVVSpl4hzv4GmZ2CXJFQ3.jpg',
            desc: 'Uma menina de 12 anos começa a apresentar comportamentos estranhos e violentos. Sua mãe, desesperada, busca a ajuda de dois padres para realizar um exorcismo.',
            director: 'William Friedkin',
            cast: ['Ellen Burstyn', 'Max von Sydow', 'Linda Blair', 'Jason Miller'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Terror',
            tmdbId: 9552
        },
        {
            id: 18,
            title: 'Invocação do Mal',
            year: 2013,
            rating: 7.5,
            poster: '/1eUfW9m9d3z5i1c0XtJqJ8mGQZV.jpg',
            desc: 'Os investigadores paranormais Ed e Lorraine Warren ajudam uma família aterrorizada por uma presença sombria em sua casa isolada no campo.',
            director: 'James Wan',
            cast: ['Patrick Wilson', 'Vera Farmiga', 'Ron Livingston', 'Lili Taylor'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Terror',
            tmdbId: 138843
        },
        {
            id: 19,
            title: 'Hereditário',
            year: 2018,
            rating: 7.3,
            poster: '/4dT5qFmQmZ6LhVnE5IIjIbhZyC.jpg',
            desc: 'Após a morte da avó reclusa, uma família começa a desvendar segredos aterrorizantes sobre sua herança e linhagem, descobrindo que o mal pode ser herdado.',
            director: 'Ari Aster',
            cast: ['Toni Collette', 'Alex Wolff', 'Milly Shapiro', 'Gabriel Byrne'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Terror',
            tmdbId: 493922
        }
    ],
    'Romance': [
        {
            id: 20,
            title: 'Titanic',
            year: 1997,
            rating: 7.9,
            poster: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
            desc: 'Uma jovem da aristocracia e um artista pobre se apaixonam a bordo do navio mais luxuoso do mundo, durante sua viagem inaugural e trágica que mudaria a história.',
            director: 'James Cameron',
            cast: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane', 'Kathy Bates'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Romance',
            tmdbId: 597
        },
        {
            id: 21,
            title: 'Diário de uma Paixão',
            year: 2004,
            rating: 7.8,
            poster: '/uTZt0UNziJQXgDHcWWqMLxQCnHF.jpg',
            desc: 'Um homem idoso conta a história de amor de sua vida para uma mulher com Alzheimer, relembrando o romance proibido que viveram na juventude e que sobreviveu a décadas.',
            director: 'Nick Cassavetes',
            cast: ['Ryan Gosling', 'Rachel McAdams', 'James Garner', 'Gena Rowlands'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Romance',
            tmdbId: 11036
        }
    ],
    'Animação': [
        {
            id: 22,
            title: 'Toy Story',
            year: 1995,
            rating: 8.3,
            poster: '/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
            desc: 'Os brinquedos do pequeno Andy ganham vida quando ninguém está olhando. Quando um novo e moderno brinquedo chega, o xerife Woody sente seu posto de brinquedo favorito ameaçado.',
            director: 'John Lasseter',
            cast: ['Tom Hanks', 'Tim Allen', 'Don Rickles', 'Wallace Shawn'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Animação',
            tmdbId: 862
        },
        {
            id: 23,
            title: 'Procurando Nemo',
            year: 2003,
            rating: 8.2,
            poster: '/syALhB3k6iLuHKh5oWXBnWQ5bVK.jpg',
            desc: 'Um pai peixe-palhaço atravessa o oceano, enfrentando tubarões, águas-vivas e tartarugas surfistas para encontrar seu filho capturado por um mergulhador.',
            director: 'Andrew Stanton',
            cast: ['Albert Brooks', 'Ellen DeGeneres', 'Alexander Gould', 'Willem Dafoe'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Animação',
            tmdbId: 12
        }
    ],
    'Aventura': [
        {
            id: 24,
            title: 'Jurassic Park - Parque dos Dinossauros',
            year: 1993,
            rating: 8.1,
            poster: '/oU7Oq2kFAAlGqbHhDNSHcPyfEUC.jpg',
            desc: 'Um parque temático com dinossauros vivos criados por engenharia genética se transforma em um pesadelo quando as criaturas escapam do controle durante uma visita de avaliação.',
            director: 'Steven Spielberg',
            cast: ['Sam Neill', 'Laura Dern', 'Jeff Goldblum', 'Richard Attenborough'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Aventura',
            tmdbId: 329
        },
        {
            id: 25,
            title: 'Indiana Jones e Os Caçadores da Arca Perdida',
            year: 1981,
            rating: 8.4,
            poster: '/ceG9VzoRAVGwivFU403Wc3AHRys.jpg',
            desc: 'O arqueólogo aventureiro Indiana Jones enfrenta nazistas em uma corrida para encontrar a Arca da Aliança antes que Hitler a use para conquistar o mundo.',
            director: 'Steven Spielberg',
            cast: ['Harrison Ford', 'Karen Allen', 'Paul Freeman', 'John Rhys-Davies'],
            videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg',
            genre: 'Aventura',
            tmdbId: 85
        }
    ]
};

// Array de todas as categorias
const allCategories = Object.keys(moviesDB);

// Função para buscar filme por ID
function getMovieById(id) {
    for (const category of Object.values(moviesDB)) {
        const movie = category.find(m => m.id === id);
        if (movie) return movie;
    }
    return null;
}

// Função para buscar filmes por termo
function searchMovies(query) {
    const q = query.toLowerCase();
    const results = [];
    for (const category of Object.values(moviesDB)) {
        for (const movie of category) {
            if (movie.title.toLowerCase().includes(q) ||
                movie.director.toLowerCase().includes(q) ||
                movie.cast.some(a => a.toLowerCase().includes(q)) ||
                movie.genre.toLowerCase().includes(q) ||
                movie.desc.toLowerCase().includes(q)) {
                results.push(movie);
            }
        }
    }
    return results;
}

console.log('🎬 Banco de filmes carregado:', Object.values(moviesDB).flat().length, 'filmes');