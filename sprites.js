(function () {
  function drawBackground(ctx, width, height, time) {
    ctx.save();

    var ceilingHeight = Math.floor(height * 0.38);
    var floorLine = height - Math.floor(height * 0.125);

    ctx.fillStyle = '#bde9e5';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#eaf8f3';
    ctx.fillRect(0, 0, width, ceilingHeight);

    ctx.strokeStyle = '#9bcfc9';
    ctx.lineWidth = 2;
    for (var tileX = -20; tileX < width + 20; tileX += 42) {
      ctx.beginPath();
      ctx.moveTo(tileX, 0);
      ctx.lineTo(tileX + 18, ceilingHeight);
      ctx.stroke();
    }

    ctx.fillStyle = '#fff7c7';
    ctx.fillRect(28, 28, 72, 12);
    ctx.fillRect(width - 104, 28, 72, 12);
    ctx.fillStyle = '#fffdf0';
    ctx.fillRect(34, 40, 60, 8);
    ctx.fillRect(width - 98, 40, 60, 8);

    var shelfBase = floorLine - 24;
    ctx.fillStyle = '#386b72';
    ctx.fillRect(0, ceilingHeight - 8, width, 10);
    ctx.fillStyle = '#4f8d8f';
    ctx.fillRect(0, ceilingHeight + 2, width, shelfBase - ceilingHeight - 2);

    ctx.fillStyle = '#2d5960';
    for (var shelfX = -12; shelfX < width + 20; shelfX += 92) {
      ctx.fillRect(shelfX, ceilingHeight + 18, 60, shelfBase - ceilingHeight - 18);
      ctx.fillStyle = '#f3ca65';
      ctx.fillRect(shelfX + 7, ceilingHeight + 30, 18, 26);
      ctx.fillStyle = '#f07f6f';
      ctx.fillRect(shelfX + 32, ceilingHeight + 30, 18, 26);
      ctx.fillStyle = '#f6e9a9';
      ctx.fillRect(shelfX + 7, ceilingHeight + 72, 43, 7);
      ctx.fillStyle = '#2d5960';
    }

    ctx.fillStyle = '#f7f0d5';
    ctx.fillRect(0, floorLine, width, height - floorLine);
    ctx.strokeStyle = '#d7c997';
    ctx.lineWidth = 2;
    for (var floorX = -30; floorX < width + 30; floorX += 48) {
      ctx.beginPath();
      ctx.moveTo(floorX, floorLine);
      ctx.lineTo(floorX + 12, height);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    var gleam = (time * 18) % (width + 80) - 80;
    ctx.fillRect(gleam, ceilingHeight + 12, 34, shelfBase - ceilingHeight - 30);

    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();

    var top = height - groundHeight;
    ctx.fillStyle = '#f4d77b';
    ctx.fillRect(0, top, width, groundHeight);

    ctx.fillStyle = '#243d4a';
    ctx.fillRect(0, top, width, 7);
    ctx.fillStyle = '#e98961';
    ctx.fillRect(0, top + 7, width, 5);

    ctx.strokeStyle = '#c4a958';
    ctx.lineWidth = 2;
    var tile = 34;
    var start = -(offset % tile) - tile;
    for (var x = start; x < width + tile; x += tile) {
      ctx.beginPath();
      ctx.moveTo(x, top + 18);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (var y = top + 18; y < height; y += 24) {
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
    ctx.rotate(Math.max(-0.22, Math.min(0.28, velocity / 900)));

    var half = size / 2;
    var edge = Math.max(2, size * 0.07);
    ctx.lineJoin = 'round';
    ctx.lineWidth = edge;
    ctx.strokeStyle = '#263746';

    ctx.fillStyle = '#f27d68';
    ctx.beginPath();
    ctx.roundRect(-half * 0.82, -half * 0.78, size * 0.82, size * 0.92, size * 0.22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f9d36b';
    ctx.beginPath();
    ctx.arc(half * 0.3, -half * 0.54, half * 0.38, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fff8df';
    ctx.beginPath();
    ctx.arc(-half * 0.16, -half * 0.24, half * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#263746';
    ctx.beginPath();
    ctx.arc(-half * 0.12, -half * 0.23, Math.max(1.5, half * 0.07), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#74c9bd';
    ctx.beginPath();
    ctx.roundRect(-half * 0.62, half * 0.06, half * 0.98, half * 0.26, half * 0.1);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f7b24f';
    ctx.beginPath();
    ctx.moveTo(half * 0.02, -half * 0.02);
    ctx.lineTo(half * 0.72, half * 0.1);
    ctx.lineTo(half * 0.02, half * 0.24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();

    var outline = '#263746';
    var aisle = '#df7b58';
    var trim = '#f3c65f';

    function drawAisle(top, bottom, cartAtBottom) {
      var inset = 1.5;
      var left = x + inset;
      var right = x + pipeWidth - inset;
      var boxHeight = Math.max(0, bottom - top);

      ctx.fillStyle = aisle;
      ctx.fillRect(left, top + inset, pipeWidth - inset * 2, Math.max(0, boxHeight - inset * 2));

      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.strokeRect(left, top + inset, pipeWidth - inset * 2, Math.max(0, boxHeight - inset * 2));

      ctx.fillStyle = trim;
      ctx.fillRect(x + 7, top + 9, pipeWidth - 14, 8);
      ctx.fillRect(x + 7, bottom - 17, pipeWidth - 14, 8);

      ctx.strokeStyle = '#9c4f4b';
      ctx.lineWidth = 2;
      for (var shelfY = top + 30; shelfY < bottom - 22; shelfY += 25) {
        ctx.beginPath();
        ctx.moveTo(x + 8, shelfY);
        ctx.lineTo(x + pipeWidth - 8, shelfY);
        ctx.stroke();
      }

      if (cartAtBottom && boxHeight > 46) {
        var cartY = bottom - 39;
        ctx.strokeStyle = outline;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + 13, cartY);
        ctx.lineTo(x + pipeWidth - 12, cartY);
        ctx.lineTo(x + pipeWidth - 18, cartY + 18);
        ctx.lineTo(x + 19, cartY + 18);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = '#74c9bd';
        ctx.fillRect(x + 17, cartY + 4, pipeWidth - 35, 10);
        ctx.fillStyle = outline;
        ctx.beginPath();
        ctx.arc(x + 23, cartY + 23, 4, 0, Math.PI * 2);
        ctx.arc(x + pipeWidth - 23, cartY + 23, 4, 0, Math.PI * 2);
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
