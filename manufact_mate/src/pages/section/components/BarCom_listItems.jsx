import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import StarBorder from '@mui/icons-material/StarBorder';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';



export function MainListItems () {

  const [open, setOpen] = React.useState(true); //리스트 펼침을 위한 state
  const navigate = useNavigate(); // 로그인 성공 시, 경로 이동을 위한 함수

  const handleClick = () => {
    setOpen(!open);
    console.log("클릭");
  };

  //사이드 바 페이지 이동 이벤트
  const handleMovePageClick = (e) => {
	console.log("페이지 경로 id 확인 : " + e.currentTarget.id);
	navigate("/"+e.currentTarget.id);
  }

  return (
  <React.Fragment>
	<ListItemButton id="home" onClick={handleMovePageClick}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="메인" />
    </ListItemButton>

    <ListItemButton id="ship" onClick={handleMovePageClick}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="수주관리" />
    </ListItemButton>

    <ListItemButton id="product">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="생산관리" />
    </ListItemButton>

    <ListItemButton id="mornitor" onClick={handleClick}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="모니터링" />
	  {open ? <ExpandLess /> : <ExpandMore />}
	  </ListItemButton>
	  <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
			{/*세부 메뉴 : 생산현황*/}
          <ListItemButton id="pps_mor" sx={{ pl: 4 }}>
            <ListItemIcon>
              <HorizontalRuleIcon />
            </ListItemIcon>
            <ListItemText primary="생산현황" />
          </ListItemButton>

			{/*세부 메뉴 : 생산부 모니터링*/}
		  <ListItemButton id="pps_mor" sx={{ pl: 4 }}>
            <ListItemIcon>
              <HorizontalRuleIcon />
            </ListItemIcon>
            <ListItemText primary="생산부 모니터링" />
          </ListItemButton>
        </List>
      </Collapse>
  </React.Fragment>
  );
}

//하단부 ListItem
export const SecondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
	Human Resources
    </ListSubheader>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="사원정보" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="개인정보 관리" />
    </ListItemButton>
  </React.Fragment>
);
