import React, { useRef } from "react"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"

const ServiceWorkerDialog: React.FC = () => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  const closeDialog = () => {
    if (!ref.current) return
    ref.current.dataset.visible = "false"
  }

  return (
    <Styled.DialogOverlay ref={ref} id="sw-dialog" data-visible="false">
      <Styled.DialogParagraph>{t("common:sw_update")}</Styled.DialogParagraph>
      <Styled.CloseButton type="button" onClick={closeDialog}>
        <svg viewBox="0 0 21.92 21.92">
          <g transform="translate(-28.646 -39.146)">
            <line
              x2="30"
              transform="translate(29 39.5) rotate(45)"
              fill="none"
              stroke="#222"
              strokeWidth="1"
            />
            <line
              x2="30"
              transform="translate(29 60.713) rotate(-45)"
              fill="none"
              stroke="#222"
              strokeWidth="1"
            />
          </g>
        </svg>
        <div className="loader"></div>
      </Styled.CloseButton>
    </Styled.DialogOverlay>
  )
}

export default ServiceWorkerDialog
