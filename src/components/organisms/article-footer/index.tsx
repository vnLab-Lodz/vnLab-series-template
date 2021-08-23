import React from "react"
import { useTranslation } from "react-i18next"
import usePublication from "src/hooks/usePublication"
import FooterElement from "~components/molecules/footer-element"
import * as Styled from "./style"

interface Props {
  currentPath: string
}

const ArticleFooter: React.FC<Props> = ({ currentPath }) => {
  const { t } = useTranslation("common")

  const publicationPages = usePublication()

  return (
    <Styled.FooterSpacer>
      <Styled.FooterGrid>
        <Styled.FooterContainer>
          <Styled.ArrowButton side="left">{"<"}</Styled.ArrowButton>
          <FooterElement
            number={1}
            header={t("previous_article")}
            title="Peerelowska niedojakość, czyli kino polskiego sockonsumpcjonizmu w nowym ujęciu"
            author="Anna Baumgart"
            summary={`We wczesnych, zwłaszcza fabularnych filmach Agnès Vardy śmierć jest
            dla bohaterek egzystencjalnym skandalem – przychodzi znikąd, jest
            absurdalna, pozbawiona sensu i uzasadnienia w świecie, w którym
            piękno i miłość to synonimy życia. Śmierć jawi się jako coś w
            ścisłym sensie nie do pomyślenia czy wyobrażenia, nawet jeśli
            bohaterki muszą się z nią – zresztą tylko pozornie – skonfrontować w
            indywidualnym doświadczeniu. W Szczęściu (Le bonheur, 1965) śmierć
            (być może samobójcza) jednej z głównych bohaterek to jedyny moment,
            w którym celowo sztuczna, nadmiernie pogodna i beztroska tonacja
            filmu zostaje na krótką chwilę zawieszona – widzimy zwłoki młodej,
            pięknej kobiety, której odejście pozwala zrealizować męską fantazję
            o niemal bezbolesnym zastąpieniu jednej kobiety przez inną, żony
            przez kochankę.`}
            variant="left"
          />
          <FooterElement
            number={2}
            header={t("next_article")}
            title="Peerelowska niedojakość, czyli kino polskiego sockonsumpcjonizmu w nowym ujęciu"
            author="Anna Baumgart"
            summary={`We wczesnych, zwłaszcza fabularnych filmach Agnès Vardy śmierć jest
            dla bohaterek egzystencjalnym skandalem – przychodzi znikąd, jest
            absurdalna, pozbawiona sensu i uzasadnienia w świecie, w którym
            piękno i miłość to synonimy życia. Śmierć jawi się jako coś w
            ścisłym sensie nie do pomyślenia czy wyobrażenia, nawet jeśli
            bohaterki muszą się z nią – zresztą tylko pozornie – skonfrontować w
            indywidualnym doświadczeniu. W Szczęściu (Le bonheur, 1965) śmierć
            (być może samobójcza) jednej z głównych bohaterek to jedyny moment,
            w którym celowo sztuczna, nadmiernie pogodna i beztroska tonacja
            filmu zostaje na krótką chwilę zawieszona – widzimy zwłoki młodej,
            pięknej kobiety, której odejście pozwala zrealizować męską fantazję
            o niemal bezbolesnym zastąpieniu jednej kobiety przez inną, żony
            przez kochankę.`}
            variant="right"
          />
          <Styled.ArrowButton side="right">{">"}</Styled.ArrowButton>
        </Styled.FooterContainer>
      </Styled.FooterGrid>
    </Styled.FooterSpacer>
  )
}

export default ArticleFooter
