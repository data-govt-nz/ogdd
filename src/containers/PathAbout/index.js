import React from 'react';
import { Helmet } from 'react-helmet';

// utils
import getLabel from 'utils/get-label';
import setLinkTarget from 'utils/set-link-target';

// components
import Label from 'components/Label';
import PageTitle from 'components/PageTitle';
import ReadMore from 'components/ReadMore';
import FSModal from 'components/FSModal';
import AsideContent from 'components/AsideContent';

// simple styles (styled components)
import Row from 'styles/Row';
import Column from 'styles/Column';
import PageLongTitle from 'styles/PageLongTitle';
import PageContainer from 'styles/PageContainer';
import Hidden from 'styles/Hidden';
import Visible from 'styles/Visible';
import PageTitleWrapper from 'styles/PageTitleWrapper';
import ReadMoreWrapper from 'styles/ReadMoreWrapper';

// assets
import titleIcon from 'assets/about.svg';
import main from 'text/about.md'; // loaded as HTML from markdown
import description from 'text/about-aside.md'; // loaded as HTML from markdown

const INITIAL_STATE = {
  showModal: false,
};

class PathAbout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onReadMore(showModal = true) {
    this.setState({ showModal });
  }
  onFSModalDismiss() {
    this.setState({
      showModal: false,
    });
  }

  renderAsideContent() {
    return (
      <AsideContent
        title={this.renderPageTitle()}
        html={description}
      />
    );
  }

  renderPageTitle() {
    return (
      <PageTitle labelId="component.about.title" iconSrc={titleIcon} />
    );
  }

  render() {
    /* eslint-disable react/no-danger */
    return (
      <PageContainer>
        <Helmet>
          <title>{getLabel('component.about.title')}</title>
          <meta
            name="description"
            content={getLabel('component.about.metaDescription')}
          />
        </Helmet>
        <Hidden min={0}>
          <PageTitleWrapper>
            { this.renderPageTitle() }
            <ReadMoreWrapper>
              <ReadMore onClick={() => this.onReadMore()} />
            </ReadMoreWrapper>
          </PageTitleWrapper>
        </Hidden>
        { this.state.showModal &&
          <FSModal dismiss={() => this.onFSModalDismiss()}>
            { this.renderAsideContent() }
          </FSModal>
        }
        <PageLongTitle id="pageTitle">
          <Label id="component.about.longTitle" />
        </PageLongTitle>
        <Row>
          <Column width={[1, 1 / 4]} order={2}>
            <Visible min={0} >
              { this.renderAsideContent() }
            </Visible>
          </Column>
          <Column width={[1, 3 / 4]} order={1}>
            <div dangerouslySetInnerHTML={{ __html: setLinkTarget(main) }} />
          </Column>
        </Row>
      </PageContainer>
    );
  }
  /* eslint-enable react/no-danger */
}

export default PathAbout;
