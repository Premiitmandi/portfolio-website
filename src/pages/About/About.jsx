import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { Page } from "../../components/Page";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import IIT from "../../assets/images/iit_mandi.png";
import srvm1 from "../../assets/images/srvm.png";
import srvm from "../../assets/images/srvm.png";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, []);
  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
          I am Prem Shankar, currently pursuing a B.Tech in Computer Science and Engineering at the prestigious Indian Institute of Technology (IIT) Mandi. Born and raised with a passion for technology and problem-solving, I have dedicated my academic and professional journey to mastering the art of computer science, with a particular interest in machine learning,and software development.
          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                title: "Indian Institute of Technology Mandi(IIT MANDI),MANDI",
                p: "Bachelors of Computer Engineering (2021-2025)",
                image: IIT,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "Ram krishna vidya mandir, Bihar",
                p: "High School",
                image: srvm1,
              }}
            />
            <AboutItem
              color={yellow}
              data={{
                title: "Ram krishna vidya mandir, Bihar",
                p: "Secondary Education",
                image: srvm,
              }}
            />
          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas camera={{ position: [0, 0, 18] }}>
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};
