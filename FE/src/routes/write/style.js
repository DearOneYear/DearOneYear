import styled, {keyframes, css} from "styled-components"
export const fadeIn = keyframes`
0%{
    opacity:0;
}
100%{
    opacity: 1;
}
`
export const Container = styled.div`
width: 100%;
min-height: 100vh;
background: skyblue;
display: flex;
flex-direction: column;

`
export const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    opacity: 0;
    transition: 1s;
    visibility: hidden;
    ${props => props.huge &&
    css`
    visibility: visible;
    opacity: 1;
    `}
`
export const Text = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    opacity: 0;
    animation: ${fadeIn} 3s 1s forwards;
`