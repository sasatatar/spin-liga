import { VDOM } from 'cx/ui';
import { PureContainer, Icon } from 'cx/widgets';

export const LoadingOverlay = ({loading, children}) => <cx>
    <div className="cxb-loading-overlay-container">
        {children}
        <div if={loading} className="cxe-loading-overlay">
            <div className="cxe-loading-indicator">
                <Icon name='loading' 
                    style={{
                        width: '24px', 
                        height: '24px',
                        //position: 'relative',
                        //top: '6px' 
                    }} />
                Loading...
            </div>
        </div>
    </div>
</cx>;