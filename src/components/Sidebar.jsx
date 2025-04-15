import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  max-width: 90%;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1002;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 480px) {
    width: 300px;
  }
`

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
`

const SidebarTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #333;
  }
`

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`

function Sidebar({ children, isOpen, setIsOpen, title = 'Sepetim' }) {
  const sidebarRef = useRef(null)
  
  // Dışarı tıklandığında sidebar'ı kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    
    // Sidebar açıkken scroll'u engelle
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, setIsOpen])
  
  // ESC tuşuna basıldığında sidebar'ı kapat
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscKey)
    
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [setIsOpen])
  
  return (
    <>
      <SidebarOverlay isOpen={isOpen} />
      <SidebarContainer isOpen={isOpen} ref={sidebarRef}>
        <SidebarHeader>
          <SidebarTitle>{title}</SidebarTitle>
          <CloseButton onClick={() => setIsOpen(false)}>
            <FaTimes />
          </CloseButton>
        </SidebarHeader>
        <SidebarContent>
          {children}
        </SidebarContent>
      </SidebarContainer>
    </>
  )
}

export default Sidebar