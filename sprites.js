(function () {
  function drawBackground(ctx, width, height, time) {
    ctx.save();

    var groundLine = height * 0.875;
    var ceiling = height * 0.36;
    var drift = ((time * 12) % 72 + 72) % 72;

    ctx.fillStyle = '#bfeeff';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#f7fbff';
    ctx.fillRect(0, 0, width, ceiling);

    ctx.fillStyle = '#d9c6ff';
    ctx.fillRect(0, ceiling - 10, width, 10);
    ctx.fillStyle = '#562b70';
    ctx.fillRect(0, ceiling - 5, width, 5);

    ctx.strokeStyle = '#a98bdc';
    ctx.lineWidth = 2;
    for (var tileX = -72 - drift; tileX < width + 72; tileX += 72) {
      ctx.beginPath();
      ctx.moveTo(tileX, 0);
      ctx.lineTo(tileX + 28, ceiling - 10);
      ctx.stroke();
    }

    ctx.fillStyle = '#ef4ca5';
    ctx.fillRect(24, 26, width - 48, 34);
    ctx.strokeStyle = '#3b245b';
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 26, width - 48, 34);
    ctx.fillStyle = '#fff6ff';
    ctx.fillRect(40, 36, width - 80, 10);

    ctx.fillStyle = '#6b38a8';
    ctx.fillRect(0, ceiling, width, groundLine - ceiling);
    ctx.fillStyle = '#4b2678';
    for (var shelfX = -18; shelfX < width + 18; shelfX += 92) {
      ctx.fillRect(shelfX, ceiling + 18, 68, groundLine - ceiling - 28);
      ctx.fillStyle = '#39d59a';
      ctx.fillRect(shelfX + 9, ceiling + 32, 19, 28);
      ctx.fillStyle = '#4db8ff';
      ctx.fillRect(shelfX + 36, ceiling + 32, 21, 28);
      ctx.fillStyle = '#f6d84d';
      ctx.fillRect(shelfX + 9, ceiling + 76, 48, 8);
      ctx.fillStyle = '#4b2678';
    }

    ctx.fillStyle = '#f9d8f0';
    ctx.fillRect(0, groundLine, width, height - groundLine);
    ctx.fillStyle = '#d36bb1';
    ctx.fillRect(0, groundLine, width, 6);

    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();

    var top = height - groundHeight;
    var tile = 36;
    var start = -((offset % tile) + tile) % tile - tile;

    ctx.fillStyle = '#50d6aa';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.fillStyle = '#3b245b';
    ctx.fillRect(0, top, width, 7);
    ctx.fillStyle = '#f04da7';
    ctx.fillRect(0, top + 7, width, 6);

    ctx.strokeStyle = '#23846e';
    ctx.lineWidth = 2;
    for (var x = start; x < width + tile; x += tile) {
      ctx.beginPath();
      ctx.moveTo(x, top + 13);
      ctx.lineTo(x + tile, height);
      ctx.stroke();
    }
    ctx.strokeStyle = '#8bf0c9';
    for (var y = top + 28; y < height; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.max(-0.2, Math.min(0.25, velocity / 900)));

    var half = size / 2;
    var outline = '#241b3d';
    var line = Math.max(2, size * 0.08);
    ctx.lineJoin = 'round';
    ctx.lineWidth = line;
    ctx.strokeStyle = outline;

    ctx.fillStyle = '#ef4ca5';
    ctx.beginPath();
    ctx.roundRect(-half * 0.78, -half * 0.72, size * 0.9, size * 0.84, half * 0.24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#7d45d6';
    ctx.beginPath();
    ctx.arc(half * 0.28, -half * 0.53, half * 0.34, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f7fbff';
    ctx.beginPath();
    ctx.arc(-half * 0.2, -half * 0.3, half * 0.17, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = outline;
    ctx.beginPath();
    ctx.arc(-half * 0.16, -half * 0.29, Math.max(1.5, half * 0.07), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#39d59a';
    ctx.beginPath();
    ctx.roundRect(-half * 0.62, half * 0.02, half * 0.9, half * 0.24, half * 0.1);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f6d84d';
    ctx.beginPath();
    ctx.moveTo(half * 0.08, -half * 0.03);
    ctx.lineTo(half * 0.72, half * 0.1);
    ctx.lineTo(half * 0.08, half * 0.24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();

    var outline = '#241b3d';
    var shelf = '#7d45d6';
    var accent = '#39d59a';

    function drawAisle(top, bottom, showCart) {
      var boxHeight = Math.max(0, bottom - top);
      ctx.fillStyle = shelf;
      ctx.fillRect(x, top, pipeWidth, boxHeight);

      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 2, top + 2, Math.max(0, pipeWidth - 4), Math.max(0, boxHeight - 4));

      if (boxHeight < 12) return;

      ctx.fillStyle = '#ef4ca5';
      ctx.fillRect(x + 5, top + 6, Math.max(0, pipeWidth - 10), 9);
      ctx.fillStyle = '#4db8ff';
      ctx.fillRect(x + 5, bottom - 15, Math.max(0, pipeWidth - 10), 9);

      ctx.strokeStyle = '#432367';
      ctx.lineWidth = 2;
      for (var row = top + 25; row < bottom - 20; row += 24) {
        ctx.beginPath();
        ctx.moveTo(x + 7, row);
        ctx.lineTo(x + pipeWidth - 7, row);
        ctx.stroke();
      }

      if (showCart && boxHeight > 48) {
        var cartTop = bottom - 38;
        ctx.strokeStyle = outline;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + 12, cartTop);
        ctx.lineTo(x + pipeWidth - 10, cartTop);
        ctx.lineTo(x + pipeWidth - 17, cartTop + 18);
        ctx.lineTo(x + 18, cartTop + 18);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = accent;
        ctx.fillRect(x + 17, cartTop + 4, Math.max(0, pipeWidth - 34), 9);
        ctx.fillStyle = outline;
        ctx.beginPath();
        ctx.arc(x + 23, cartTop + 23, 4, 0, Math.PI * 2);
        ctx.arc(x + pipeWidth - 22, cartTop + 23, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    drawAisle(0, gapTop, false);
    drawAisle(gapBottom, height, true);

    ctx.restore();
  }

  window.SPRITES = {
    drawBackground: drawBackground,
    drawGround: drawGround,
    drawBird: drawBird,
    drawPipe: drawPipe
  };
})();
