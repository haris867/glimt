import styled from "styled-components";

export const CaptureButton = styled.button`
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #fff;
  transition: all 0.3s ease-in;
  font-size: 1.2em;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  padding: 10px 30px;
  width: 100%;
  max-width: 180px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #fff;
    color: #2d6b79;
  }
`;

export const RemoveButton = styled(CaptureButton)`
  background-color: #fff;
  color: #2d6b79;
  &:hover {
    background-color: transparent;
    color: #fff;
  }
`;

export const CaptureLabel = styled.label`
  border: solid 2.5px #f4d2da;
  border-radius: 5px;
  min-width: 300px;
  max-width: 300px;
`;

export const CapturedImageContainer = styled.div`
  max-width: 450px;
`;

export const CapturedImage = styled.img`
  width: calc(100px + 50vw);
  max-width: 650px;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
