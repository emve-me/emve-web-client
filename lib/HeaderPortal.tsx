import { createPortal } from 'react-dom'


export default ({ children }: { children: React.ReactNode }) => createPortal(
  children,
  document.getElementById('HEADER_PORTAL')
);