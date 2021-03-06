import * as React from "react";
import { QueryResult } from "react-apollo";
import { TypedUserSearch } from "../queries";
import { UserSearch, UserSearchVariables } from "../types/UserSearch";

interface UserSearchProviderProps {
  children:
    | ((
        props: {
          search: (query: string) => void;
          searchOpts: QueryResult<UserSearch, UserSearchVariables>;
        }
      ) => React.ReactElement<any>)
    | React.ReactNode;
}
interface UserSearchProviderState {
  query: string;
}

export class UserSearchProvider extends React.Component<
  UserSearchProviderProps,
  UserSearchProviderState
> {
  state: UserSearchProviderState = { query: "" };

  search = (query: string) => this.setState({ query });

  render() {
    const { children } = this.props;
    if (typeof children === "function") {
      return (
        <TypedUserSearch
          variables={{ search: this.state.query }}
          skip={!this.state.query}
        >
          {searchOpts => children({ search: this.search, searchOpts })}
        </TypedUserSearch>
      );
    }
    return this.props.children;
  }
}
