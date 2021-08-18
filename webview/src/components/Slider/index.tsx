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
  tabIndex?: number
  onValueChange?(value: number): void
  onValueChangeStart?(value: number): void
  onValueChangeEnd?(value: number): void
}

class Slider extends Component<Props> {
  private sliderRef = createRef<HTMLDivElement>()

  private onMouseDown = (evt: ReactMouseEvent) => {
    const value = calcValue(evt.pageX, this.sliderRef.current)
    this.props.onValueChangeStart?.(value)
    value !== this.props.value && this.props.onValueChange?.(value)
    this.addDocumentEvents()
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
    const { value, className = [], tabIndex = 0 } = this.props
    const percent = `${value * 100}%`
    return (
      <div
        className={[...className, 'slider'].join(' ')}
        onMouseDown={this.onMouseDown}
        ref={this.sliderRef}
      >
        <div className="rail" />
        <div className="track" style={{ width: percent }} />
        <div tabIndex={tabIndex} className="handle" style={{ left: percent }} />
      </div>
    )
  }
}

export default Slider
