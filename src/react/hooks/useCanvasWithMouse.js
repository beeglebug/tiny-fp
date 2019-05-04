import { useState, useEffect } from 'react'

export default function useCanvasWithMouse (canvasRef) {

  const [ ctx, setCtx ] = useState(null)
  const [ rect, setRect ] = useState(null)
  const [ mousePosition, setMousePosition ] = useState(null)
  const [ mouseDown, setMouseDown ] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    setCtx(ctx)
    setRect(canvas.getBoundingClientRect())
  }, [canvasRef.current])

  useEffect(() => {
    const canvas = canvasRef.current

    function handleMouseMove (e) {
      const mousePosition = {
        x: e.clientX - rect.x,
        y: e.clientY - rect.y,
      }
      setMousePosition(mousePosition)
    }

    function handleMouseLeave () {
      setMousePosition(null)
      setMouseDown(false)
    }

    function handleMouseDown () {
      setMouseDown(true)
    }

    function handleMouseUp () {
      setMouseDown(false)
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [canvasRef.current, rect])

  return [ctx, mousePosition, mouseDown]
}