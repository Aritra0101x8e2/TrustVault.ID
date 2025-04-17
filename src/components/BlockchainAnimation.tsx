
import React, { useRef, useEffect } from 'react';

const BlockchainAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      connected: boolean[];
    }[] = [];

    const createNodes = () => {
      const nodeCount = Math.min(20, Math.floor(window.innerWidth / 100));
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connected: []
        });
      }
    };

    createNodes();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const opacity = 1 - distance / 200;
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(100, 255, 218, ${opacity * 0.4})`;
            ctx.lineWidth = opacity * 1.5;
            ctx.stroke();
            
            if (Math.random() < 0.005) {
              nodes[i].connected[j] = true;
              setTimeout(() => {
                nodes[i].connected[j] = false;
              }, Math.random() * 1000 + 500);
            }
            
            if (nodes[i].connected[j]) {
              const packetProgress = Date.now() % 1000 / 1000;
              const packetX = nodes[i].x + (nodes[j].x - nodes[i].x) * packetProgress;
              const packetY = nodes[i].y + (nodes[j].y - nodes[i].y) * packetProgress;
              
              ctx.beginPath();
              ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
              ctx.fillStyle = '#64FFDA';
              ctx.fill();
            }
          }
        }
      }
      
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 255, 218, 0.8)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 255, 218, 0.3)';
        ctx.fill();
        
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default BlockchainAnimation;
