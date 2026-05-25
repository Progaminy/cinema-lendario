// ============================================
// data/series-db.js
// BANCO COMPLETO DE SÉRIES
// Cada episódio com seu vídeo específico
// ============================================

const seriesDB = [
    {
        id: 101,
        title: 'Breaking Bad',
        year: 2008,
        rating: 9.5,
        genre: 'Drama',
        poster: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
        desc: 'Walter White, um professor de química do ensino médio diagnosticado com câncer terminal, se torna fabricante de metanfetamina para garantir o futuro financeiro de sua família. Ao lado de seu ex-aluno Jesse Pinkman, ele mergulha no perigoso mundo do crime.',
        seasons: [
            {
                number: 1,
                year: 2008,
                episodes: [
                    { number: 1, title: 'Piloto', desc: 'Walter White descobre que tem câncer terminal e decide entrar no mundo do crime para deixar dinheiro para sua família.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 2, title: 'O Gato na Bolsa', desc: 'Walter e Jesse precisam lidar com as terríveis consequências de seu primeiro crime e se livrar de um corpo.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 3, title: '...E o Saco se Rompe', desc: 'Walter toma uma decisão drástica que mudará tudo para sempre, enquanto sua família começa a perceber seu comportamento estranho.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 4, title: 'O Homem do Câncer', desc: 'A família de Walter organiza uma intervenção preocupada com seu comportamento. Jesse enfrenta problemas com traficantes rivais.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 5, title: 'Matéria Cinza', desc: 'Walter relembra seu passado brilhante como pesquisador e o que poderia ter sido se não tivesse abandonado a empresa que fundou com seu amigo.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 6, title: 'Mão na Massa', desc: 'Walter apresenta seu produto de alta qualidade a um novo e perigoso distribuidor, entrando em um território cada vez mais arriscado.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 7, title: 'Negociação Pacífica', desc: 'Um encontro tenso entre Walter e um traficante poderoso termina em violência explosiva, forçando decisões extremas.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' }
                ]
            },
            {
                number: 2,
                year: 2009,
                episodes: [
                    { number: 1, title: 'Seven Thirty-Seven', desc: 'Walter e Jesse enfrentam as terríveis consequências do encontro violento com o traficante Tuco Salamanca.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 2, title: 'Grilled', desc: 'Walter e Jesse são mantidos reféns por um traficante psicótico no deserto, lutando desesperadamente por suas vidas.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 3, title: 'Bit by a Dead Bee', desc: 'Walter cria uma história elaborada para explicar seu desaparecimento de dias para sua família e a polícia.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 4, title: 'Down', desc: 'Jesse fica sem dinheiro e sem lugar para ficar, enquanto Walter enfrenta tensões crescentes em casa com Skyler.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 5, title: 'Breakage', desc: 'Walter e Jesse expandem seus negócios de metanfetamina para novos territórios, mas os riscos e as dívidas aumentam perigosamente.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' }
                ]
            },
            {
                number: 3,
                year: 2010,
                episodes: [
                    { number: 1, title: 'No Más', desc: 'Walter tenta sair do negócio e consertar sua família, mas o passado o puxa de volta para o mundo do crime.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 2, title: 'Caballo sin Nombre', desc: 'Walter enfrenta problemas com a polícia e sua esposa Skyler, que começa a desvendar seus segredos sombrios.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 3, title: 'I.F.T.', desc: 'Skyler toma uma decisão chocante que muda a dinâmica familiar para sempre, forçando Walter a repensar tudo.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 4, title: 'Green Light', desc: 'Walter volta a cozinhar metanfetamina, mas em uma escala industrial, atraindo a atenção do misterioso Gus Fring.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' }
                ]
            }
        ]
    },
    {
        id: 102,
        title: 'Stranger Things',
        year: 2016,
        rating: 8.7,
        genre: 'Ficção Científica',
        poster: '/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
        desc: 'Quando um menino desaparece misteriosamente na pequena cidade de Hawkins, seus amigos, família e uma garota com poderes telecinéticos descobrem experimentos secretos do governo, forças sobrenaturais e o Mundo Invertido.',
        seasons: [
            {
                number: 1,
                year: 2016,
                episodes: [
                    { number: 1, title: 'O Desaparecimento de Will Byers', desc: 'Will Byers desaparece misteriosamente. Uma garota chamada Onze, com poderes telecinéticos e fugindo de um laboratório secreto, aparece na cidade.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 2, title: 'A Estranha no Maple Street', desc: 'Onze revela seus poderes para Mike e seus amigos. A busca por Will continua freneticamente.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 3, title: 'Alegre, Natal', desc: 'Joyce Byers se comunica com Will através das luzes de Natal. Onze mostra o que é capaz de fazer em um momento de tensão.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 4, title: 'O Corpo', desc: 'Um corpo é encontrado no lago da cidade. Onze prova seus poderes de forma dramática para seus novos amigos.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' }
                ]
            },
            {
                number: 2,
                year: 2017,
                episodes: [
                    { number: 1, title: 'MADMAX', desc: 'Uma nova garota ruiva chamada Max chega à cidade. O Mundo Invertido continua a ameaçar Hawkins e seus habitantes.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 2, title: 'Doce ou Travessura, Estranho', desc: 'Will tem visões aterrorizantes durante o Halloween. Os meninos tentam descobrir o que está acontecendo com ele.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 3, title: 'O Monstro e a Super-heroína', desc: 'Onze busca respostas sobre seu passado misterioso e sua conexão com o laboratório secreto de Hawkins.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' }
                ]
            }
        ]
    },
    {
        id: 103,
        title: 'Game of Thrones',
        year: 2011,
        rating: 9.2,
        genre: 'Fantasia',
        poster: '/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
        desc: 'Nove famílias nobres lutam pelo controle das terras de Westeros, enquanto um antigo inimigo retorna após milênios adormecido no gelo do Norte. Intrigas, traições, dragões e magia em uma épica batalha pelo Trono de Ferro.',
        seasons: [
            {
                number: 1,
                year: 2011,
                episodes: [
                    { number: 1, title: 'Winter Is Coming', desc: 'O Rei Robert Baratheon visita Winterfell e faz uma proposta irrecusável a Ned Stark para se tornar a Mão do Rei.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 2, title: 'The Kingsroad', desc: 'Ned parte para Porto Real com as filhas. Jon Snow vai para a Muralha. Daenerys Targaryen se casa com Khal Drogo.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v5.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y1Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 3, title: 'Lord Snow', desc: 'Jon Snow treina na Muralha. Daenerys descobre que está grávida do herdeiro dothraki. Ned investiga a morte de Jon Arryn.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YxLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 4, title: 'Cripples, Bastards, and Broken Things', desc: 'Ned continua investigando a morte de Jon Arryn. Tyrion Lannister é capturado por Catelyn Stark.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YyLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' }
                ]
            },
            {
                number: 2,
                year: 2012,
                episodes: [
                    { number: 1, title: 'The North Remembers', desc: 'Os Sete Reinos estão em guerra após a morte do Rei Robert. Robb Stark marcha para o sul para vingar seu pai.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3YzLm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' },
                    { number: 2, title: 'The Night Lands', desc: 'Daenerys lidera seu povo pelo deserto em busca de segurança. Jon Snow vai além da Muralha em uma missão perigosa.', videoUrl: 'https://qvzhhhrzrzkhgqlyxhug.supabase.co/storage/v1/object/sign/xpxVideos/videos/v4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGZlZWZkZi1lM2QxLTRhZjItOTRjNC0yNzQ5YzgxZWY1YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ4cHhWaWRlb3MvdmlkZW9zL3Y0Lm1wNCIsImlhdCI6MTc3OTcxMTIyMSwiZXhwIjo0OTMzMzExMjIxfQ.KyHfeGS_Wi6uebXBMlQmcrpn2mj5BctSBreFwWDmTWg' }
                ]
            }
        ]
    }
];

// Função para buscar série por ID
function getSeriesById(id) {
    return seriesDB.find(s => s.id === id) || null;
}

// Função para buscar séries por termo
function searchSeries(query) {
    const q = query.toLowerCase();
    return seriesDB.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q)
    );
}

console.log('📺 Banco de séries carregado:', seriesDB.length, 'séries');