import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import InputBox from '../../components/web/InputBox'

describe('InputBox 컴포넌트', () => {
  it('type="email"로 렌더링된다', () => {
    render(<InputBox type='email' placeholder='이메일 입력' size='medium' />)
    const input = screen.getByPlaceholderText('이메일 입력')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('type="text"로 렌더링된다', () => {
    render(<InputBox type='text' placeholder='텍스트 입력' size='medium' />)
    const input = screen.getByPlaceholderText('텍스트 입력')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('올바른 크기 클래스가 적용된다', () => {
    render(<InputBox type='email' placeholder='이메일 입력' size='medium' />)
    const input = screen.getByPlaceholderText('이메일 입력')
    expect(input).toHaveClass('w-full max-w-[424px] h-[56px]')
  })
})
