import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ShopCalendar } from "./components/ShopCalendar";
import { Holidays } from "./components/Holidays";
import { CheckReserve } from "./components/CheckReserve";
import { ScrollTop } from "./components/ScrollTop";
import { EditStylist } from "./components/EditStylist";
import { EditMenu } from "./components/EditMenu";
import { Ar } from "./components/Ar";
import { Time } from "./components/Time";
import {
  Authenticator,
  Button,
  Heading,
  useTheme,
  View,
  Image,
  Text,
  useAuthenticator,
  ThemeProvider,
  Theme,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src="https://user-images.githubusercontent.com/98013294/177367993-fb3fa28a-1738-46c3-b178-28285a856cb0.png"
          height="200px"
        />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          style={{ fontSize: "10" }}
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={6}
        >
          どんな角刈りにする？
          <br />
          ログインしてね
        </Heading>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toResetPassword}
            size="small"
            variation="link"
          >
            パスワードを忘れた場合
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={6}
        >
          初めまして。
          <br />
          あなたの男気見せてください。
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  SetupTOTP: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};
const formFields = {
  signIn: {
    username: {
      labelHidden: false,
      placeholder: "Enter your email",
    },
  },
  signUp: {
    name: {
      type: "name",
      labelHidden: false,
      label: "Name Push:",
      order: 1,
    },
    email: {
      type: "email",
      labelHidden: false,
      label: "Email Push:",
      order: 2,
    },
    password: {
      labelHidden: false,
      label: "Password:",
      placeholder: "Enter your Password:",
      isRequired: false,
      order: 3,
    },
    confirm_password: {
      labelHidden: false,
      label: "Confirm Password:",
      order: 4,
    },
  },
  // forceNewPassword: {
  //   password: {
  //     labelHidden: false,
  //     placeholder: "Enter your Password:",
  //   },
  // },
  // resetPassword: {
  //   username: {
  //     labelHidden: false,
  //     placeholder: "Enter your email:",
  //   },
  // },
  // confirmResetPassword: {
  //   confirmation_code: {
  //     labelHidden: false,
  //     placeholder: "Enter your Confirmation Code:",
  //     label: "New Label",
  //     isRequired: false,
  //   },
  //   confirm_password: {
  //     labelHidden: false,
  //     placeholder: "Enter your Password Please:",
  //   },
  // },
  // setupTOTP: {
  //   QR: {
  //     totpIssuer: "test issuer",
  //     totpUsername: "amplify_qr_test_user",
  //   },
  //   confirmation_code: {
  //     labelHidden: false,
  //     label: "New Label",
  //     placeholder: "Enter your Confirmation Code:",
  //     isRequired: false,
  //   },
  // },
  // confirmSignIn: {
  //   confirmation_code: {
  //     labelHidden: false,
  //     label: "New Label",
  //     placeholder: "Enter your Confirmation Code:",
  //     isRequired: false,
  //   },
  // },
};

function App() {
  const { tokens } = useTheme();
  const theme: Theme = {
    name: "Auth Example Theme",
    tokens: {
      colors: {
        background: {
          primary: {
            value: "#fff",
          },
          secondary: {
            value: "#ffffff",
          },
        },
        font: {
          primary: {
            value: "#000000",
          },
          secondary: {
            value: "#000000",
          },
          interactive: {
            value: tokens.colors.black.value,
          },
        },
        brand: {
          primary: {
            "10": tokens.colors.teal["100"],
            "80": tokens.colors.teal["40"],
            "90": tokens.colors.teal["20"],
            "100": tokens.colors.teal["10"],
          },
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: tokens.colors.black.value,
              },
            },
            _hover: {
              color: {
                value: tokens.colors.yellow["80"].value,
              },
            },
            _active: {
              color: {
                value: tokens.colors.black.value,
              },
            },
          },
        },
      },
    },
  };
  window.scroll({ top: 0, behavior: "smooth" });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Authenticator formFields={formFields} components={components}>
          {({ signOut, user }: any) => {
            sessionStorage.setItem("user", user.attributes.name);
            console.log("=====user=====", user);
            return (
              <>
                <Header signOut={signOut} userName={user.attributes.name} />
                <main>
                  <div className="App">
                    <ScrollTop />

                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shopcalendar" element={<ShopCalendar />} />
                      <Route path="/editstylist" element={<EditStylist />} />
                      <Route path="/editmenu" element={<EditMenu />} />
                      <Route path="/selecttime" element={<Time />} />
                      <Route
                        path="/selecttime/checkreserve"
                        element={<CheckReserve />}
                      />
                      <Route path="/holiday" element={<Holidays />} />
                      <Route path="/ar" element={<Ar />} />
                    </Routes>
                  </div>
                </main>
                <Footer />
              </>
            );
          }}
        </Authenticator>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
