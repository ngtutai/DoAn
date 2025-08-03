import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  shortDescription: string;
  fullDescription: string;
  skills: string[];
  social: {
    facebook?: string;
    github?: string;
    zalo?: string;
  };
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activeMember, setActiveMember] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("./data/teamData.json")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.error("Lỗi đọc JSON:", err));
  }, []);

  useEffect(() => {
    // Tạo audio element và tự động phát nhạc
    audioRef.current = new Audio(
      "/assets/audio/y2mate.gg--邓紫棋-泡沫-DJ抖音版-2025-为什么难过-Bong-Bóng-Wanji-Edit.mp3"
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7;

    // Phát nhạc sau một khoảng thời gian nhỏ
    const playAudio = () => {
      audioRef.current?.play().catch((err) => {
        console.warn("Không thể tự động phát nhạc:", err);
      });
    };

    // Delay nhẹ cho việc phát nhạc tự động
    const timeout = setTimeout(playAudio, 300);

    // Cleanup khi rời trang
    return () => {
      clearTimeout(timeout);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleMemberClick = (id: number) => {
    setActiveMember(activeMember === id ? null : id);
  };

  const getPushClass = (id: number): string => {
    if (!activeMember || activeMember === id) return "";
    if (activeMember === 1) return "push-right";
    if (activeMember === 2) {
      return id === 1 ? "push-left" : "push-right";
    }
    if (activeMember === 3) return "push-left";
    return "";
  };

  return (
    <div className="team-page">
      <Header />

      {/* BANNER */}
      <section
        className="banner-area banner-area2 text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("assets/images/banner/banner-teampage.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "550px",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.13)",
            padding: "20px 40px",
            borderRadius: "8px",
          }}
        >
          <h1 className="display-4 fw-bold mb-0">Đội ngũ chúng tôi</h1>
          <p className="lead mb-0">
            Nhấn vào từng thành viên để xem thông tin chi tiết
          </p>
          <div className="col-12 ms-5">
            <ul className="breadcrumb">
              <li className="home">
                <a href="/" className="nav-link text-muted">
                  <strong>
                    <span>Trang chủ</span>
                  </strong>
                </a>
              </li>
              <li>
                <span className="mr_lr">&nbsp;/&nbsp;</span>
                <strong>
                  <span className="text-danger">
                    Giới thiệu thành viên nhóm
                  </span>
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section className="team-members py-5">
        <div className="container">
          <div className="d-flex gap-4 justify-content-center flex-wrap">
            {teamMembers.map((member) => {
              const isActive = activeMember === member.id;
              return (
                <div
                  key={member.id}
                  className={`member-card transition-all ${
                    isActive ? "active-member" : "inactive-member"
                  } ${getPushClass(member.id)}`}
                  onClick={() => handleMemberClick(member.id)}
                >
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column align-items-center text-center">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="rounded-circle mb-3"
                        style={{ objectFit: "cover" }}
                      />
                      <h3 className="fw-bold mb-1">{member.name}</h3>
                      <p
                        className={
                          isActive ? "text-danger fw-bold" : "text-muted"
                        }
                      >
                        {member.role}
                      </p>

                      {isActive ? (
                        <>
                          <p className="my-3">{member.fullDescription}</p>
                          <div className="skills mb-3 w-100">
                            <h5 className="text-start">Kỹ năng chính:</h5>
                            <div className="d-flex flex-wrap gap-2">
                              {member.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="badge bg-light text-dark"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="social-links d-flex justify-content-center gap-3 mt-auto">
                            {Object.entries(member.social).map(
                              ([key, value]) => (
                                <a
                                  key={key}
                                  href={value}
                                  className="btn btn-outline-primary"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {key === "zalo" ? (
                                    <img
                                      src="/assets/images/iconlogo/zalo.svg"
                                      alt="Zalo"
                                      width="16"
                                      height="17"
                                    />
                                  ) : (
                                    <i className={`fa-brands fa-${key}`}></i>
                                  )}
                                </a>
                              )
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-muted mb-4">
                            {member.shortDescription}
                          </p>
                          <div className="social-links d-flex justify-content-center gap-3">
                            {Object.entries(member.social).map(
                              ([key, value]) => (
                                <span key={key} className="text-dark">
                                  {key === "zalo" ? (
                                    <img
                                      src="/assets/images/iconlogo/zalo.svg"
                                      alt="Zalo"
                                      width="16"
                                      height="17"
                                      style={{
                                        filter:
                                          "grayscale(100%) brightness(1) invert(1)",
                                      }}
                                    />
                                  ) : (
                                    <i className={`fa-brands fa-${key}`}></i>
                                  )}
                                </span>
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
