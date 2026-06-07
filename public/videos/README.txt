# Placeholder para los videos
# Reemplazar con:
#   hero-presentacion.mp4     (9:16 vertical, 1080x1920, 15-30s, máx 5MB)
#   metodo-explicado.mp4      (16:9, 1920x1080, 1-3min, máx 15MB)
#   testimonial-principal.mp4 (16:9, 1920x1080, 30-90s, máx 10MB)
#
# Comprimir con ffmpeg:
#   ffmpeg -i input.mp4 -vf "scale=1080:1920" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart hero-presentacion.mp4
