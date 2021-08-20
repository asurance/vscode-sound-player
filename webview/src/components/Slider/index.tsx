import React, {
  Component,
  createRef,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react'
import './index.css'
import { calcValue } from './Utils'

type Props = {
  value: number
  className?: string[]
  title?: string
  onValueChange?(value: number): void
  onValueChangeStart?(value: number): void
  onValueChangeEnd?(value: number): void
}

type State = {
  move: boolean
}

class Slider extends Component<Props, State> {
  private sliderRef = createRef<HTMLDivElement>()

  state = {
    move: false,
  }

  private onMouseDown = (evt: ReactMouseEvent) => {
    const value = calcValue(evt.pageX, this.sliderRef.current)
    this.props.onValueChangeStart?.(value)
    value !== this.props.value && this.props.onValueChange?.(value)
    this.addDocumentEvents()
    this.setState({ move: true })
  }

  private onMouseMove = (evt: MouseEvent) => {
    const value = calcValue(evt.pageX, this.sliderRef.current)
    value !== this.props.value && this.props.onValueChange?.(value)
  }

  private onMouseUp = (evt: MouseEvent) => {
    const value = calcValue(evt.pageX, this.sliderRef.current)
    value !== this.props.value && this.props.onValueChange?.(value)
    this.props.onValueChangeEnd?.(value)
    this.removeDocumentEvents()
    this.setState({ move: false })
  }

  private addDocumentEvents() {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  private removeDocumentEvents() {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  componentWillUnmount(): void {
    this.removeDocumentEvents()
  }

  render(): ReactNode {
    const { value, className = [], title } = this.props
    const { move } = this.state
    const percent = `${value * 100}%`
    const handleClass = ['handle']
    if (move) {
      handleClass.push('move')
    }
    return (
      <div
        className={[...className, 'slider'].join(' ')}
        onMouseDown={this.onMouseDown}
        ref={this.sliderRef}
        title={title}
      >
        <div className="rail" />
        <div className="track" style={{ width: percent }} />
        <div className={handleClass.join(' ')} style={{ left: percent }} />
      </div>
    )
  }
}

export default Slider
