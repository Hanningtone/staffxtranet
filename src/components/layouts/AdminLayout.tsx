import styled from "styled-components";
import { AdminHeader,SideMenu} from "../";

import React, {ReactNode} from "react";

interface Props {
    children?: ReactNode | ReactNode[]
    showSideMenu: boolean,
    user: any
}

const AdminLayout = (props: Props) => {
    return(
        <Wrapper>
        <AdminHeader user={props.user}/>
        <SideMenu/>
        <ContentWrapper>
               {props.children}
        </ContentWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color:#f1f1f1;
`

const ContentWrapper = styled.div`
    margin-left: 120px;
    padding:70px 0px !important;
`

export default AdminLayout;