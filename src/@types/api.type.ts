/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface HandlersCharacter {
  /** @example "dʒ" */
  char?: string;
  /** @example 0.9997 */
  confidence?: number;
  /** @example 0.24 */
  end_offset?: number;
  /** @example 0.16 */
  start_offset?: number;
}

export interface HandlersResponsePhoneme {
  characters?: HandlersCharacter[];
  /** @example 0.92 */
  confident?: number;
  /** @example "ˈrʌ[ˌ]baʊt dʒi ɛm i ɛf θri naɪn" */
  ground_truth_benchmark?: string;
  /** @example "ˈrʌbaʊt dʒi ɛm i ɛf θri naɪn" */
  predict?: string;
}

export interface ModelsImage {
  metadata?: Record<string, any>;
  name?: string;
  path?: string;
  size_in_bytes?: number;
  thumbnail_url?: string;
  url?: string;
}

export interface ModelsInternalError {
  details?: string;
  message?: string;
  status?: number;
  type?: string;
}

export interface ModelsLesson {
  created_at?: string;
  ipa?: string;
  practice_items?: ModelsPracticeItem[];
  type?: ModelsLessonType;
}

export enum ModelsLessonType {
  WordType = "word",
  PhraseType = "phrase",
  SentenceType = "sentence",
  ConversationType = "conversation",
}

export interface ModelsPaginationMeta {
  current_page?: number;
  page_count?: number;
  total_count?: number;
}

export interface ModelsPaginationWrapper {
  data?: object;
  metadata?: ModelsPaginationMeta;
}

export interface ModelsPracticeItem {
  audio_url?: string;
  content?: string;
  transcript_ipa?: string;
  translation?: string;
}

export interface ModelsSentence {
  content?: string;
  end?: number;
  start?: number;
}

export interface ModelsStory {
  audio_url?: string;
  author?: string;
  description?: string;
  duration?: number;
  image_url?: string;
  /** list sentences include vtt */
  sentences?: ModelsSentence[];
  source?: string;
  title?: string;
  transcription?: string;
  translation?: string;
  views?: number;
}

export enum ModelsStoryLevel {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
  Proficient = "proficient",
}

export enum ModelsStoryStatus {
  InProgress = "in_progress",
  Completed = "completed",
}

export interface ModelsUser {
  avatar?: string;
  email: string;
  /** relations */
  lessons?: ModelsLesson[];
  name?: string;
  stories?: ModelsStory[];
}

export interface ModelsUserCredentials {
  email: string;
  /** @minLength 6 */
  password: string;
}

export interface ModelsUserDictionaries {
  vocabulary_id?: string;
}

export interface IVocabulariesRequest {
  /** limit */
  limit?: string;
  /** page_number */
  page_number?: string;
  /** Ex: Personal Traits */
  topic?: string;
  /** Ex: A1 */
  level?: string;
  /** Ex: persistent */
  text?: string;
  /** is_strict = true return only one match */
  is_strict?: boolean;
}

export interface ModelsUserLesson {
  lesson?: ModelsLesson;
  lesson_id?: string;
  score?: number;
  user?: ModelsUser;
  user_id?: string;
}

export interface ModelsUserStory {
  level: ModelsStoryLevel;
  score?: number;
  /** list sentences include vtt */
  sentences?: ModelsUserStorySentence[];
  status?: ModelsStoryStatus;
  story?: ModelsStory;
  story_id?: string;
  user?: ModelsUser;
  user_id?: string;
}

export interface ModelsUserStorySentence {
  content?: string;
  end?: number;
  start?: number;
  user_answers?: string[];
}

export interface ModelsValidationError {
  details?: string;
  message?: string;
  status?: number;
  type?: string;
  validation_errors?: Record<string, string>;
}

export interface ModelsVocabulary {
  audio_url?: string;
  image?: string;
  level?: string;
  text?: string;
  topic?: string;
  transcript_ipa?: string;
  translation?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://103.163.214.192:9000/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
          .then((data) => {
            if (r.ok) {
              r.data = data;
            } else {
              r.error = data;
            }
            return r;
          })
          .catch((e) => {
            r.error = e;
            return r;
          });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Swagger E-Speak API
 * @version 1.0
 * @baseUrl http://103.163.214.192:9000/api
 * @contact
 *
 * This is a E-Speak golang server.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  application = {
    /**
     * No description
     *
     * @tags heartbeat
     * @name HeartbeatList
     * @summary return a status
     * @request GET:/application/heartbeat
     */
    heartbeatList: (params: RequestParams = {}) =>
      this.request<void, ModelsInternalError>({
        path: `/application/heartbeat`,
        method: "GET",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name LoginCreate
     * @summary login user
     * @request POST:/auth/login
     * @secure
     */
    loginCreate: (user: ModelsUserCredentials, params: RequestParams = {}) =>
      this.request<void, ModelsInternalError | ModelsValidationError>({
        path: `/auth/login`,
        method: "POST",
        body: user,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name LogoutCreate
     * @summary logout current account
     * @request POST:/auth/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, ModelsInternalError>({
        path: `/auth/logout`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name RefreshTokenCreate
     * @summary refresh token
     * @request POST:/auth/refresh_token
     * @secure
     */
    refreshTokenCreate: (params: RequestParams = {}) =>
      this.request<void, ModelsInternalError>({
        path: `/auth/refresh_token`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name RegisterCreate
     * @summary create a user
     * @request POST:/auth/register
     */
    registerCreate: (user: ModelsUserCredentials, params: RequestParams = {}) =>
      this.request<void, ModelsInternalError | ModelsValidationError>({
        path: `/auth/register`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        ...params,
      }),
  };
  checkPhonemes = {
    /**
     * No description
     *
     * @tags phonemes
     * @name CheckPhonemesCreate
     * @summary upload an audio with phoneme
     * @request POST:/check-phonemes
     */
    checkPhonemesCreate: (
      data: {
        /**
         * Audio file to upload
         * @format binary
         */
        audio_file: File;
        /** ground_truth */
        ground_truth: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlersResponsePhoneme, ModelsInternalError>({
        path: `/check-phonemes`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),
  };
  errors = {
    /**
     * No description
     *
     * @tags errors
     * @name ErrorsDetail
     * @summary return an error
     * @request GET:/errors/{id}
     * @secure
     */
    errorsDetail: (id: string, params: RequestParams = {}) =>
      this.request<ModelsInternalError, ModelsValidationError>({
        path: `/errors/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  images = {
    /**
     * No description
     *
     * @tags images
     * @name ImagesCreate
     * @summary upload an image with thumbnail
     * @request POST:/images
     */
    imagesCreate: (
      data: {
        /**
         * Image file to upload
         * @format binary
         */
        image_file: File;
        /**
         * Thumbnail image file to upload
         * @format binary
         */
        image_thumbnail_file: File;
        /** Metadata associated with the image */
        metadata?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsImage, ModelsValidationError | ModelsInternalError>({
        path: `/images`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),
  };
  lessons = {
    /**
     * No description
     *
     * @tags lessons
     * @name LessonsList
     * @summary return list lessons
     * @request GET:/lessons
     * @secure
     */
    lessonsList: (
      query?: {
        /** limit */
        limit?: string;
        /** page_number */
        page_number?: string;
        /** type */
        type?: string;
        /** name */
        name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsPaginationWrapper, ModelsInternalError>({
        path: `/lessons`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lessons
     * @name GetLessons
     * @summary return list IPA
     * @request GET:/lessons/ipa
     * @secure
     */
    getLessons: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lessons/ipa`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @summary return list users
     * @request GET:/users
     * @secure
     */
    usersList: (
      query?: {
        /** limit */
        limit?: string;
        /** page_number */
        page_number?: string;
        /** search_query */
        search_query?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsPaginationWrapper, ModelsInternalError>({
        path: `/users`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersDetail
     * @summary return a user
     * @request GET:/users/{user_id}
     * @secure
     */
    usersDetail: (userId: string, params: RequestParams = {}) =>
      this.request<ModelsUser, ModelsInternalError>({
        path: `/users/${userId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdate
     * @summary update a user
     * @request PUT:/users/{user_id}
     * @secure
     */
    usersUpdate: (userId: string, user: ModelsUser, params: RequestParams = {}) =>
      this.request<ModelsUser, ModelsValidationError | ModelsInternalError>({
        path: `/users/${userId}`,
        method: "PUT",
        body: user,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersDelete
     * @summary delete a user
     * @request DELETE:/users/{user_id}
     * @secure
     */
    usersDelete: (userId: string, params: RequestParams = {}) =>
      this.request<void, ModelsInternalError>({
        path: `/users/${userId}`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name DictionariesCreate
     * @summary add vocabulary in dictionary
     * @request POST:/users/{user_id}/dictionaries
     * @secure
     */
    dictionariesCreate: (userId: string, dictionaries: ModelsUserDictionaries, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${userId}/dictionaries`,
        method: "POST",
        body: dictionaries,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name DictionariesDelete
     * @summary delete dictionary
     * @request DELETE:/users/{user_id}/dictionaries/{vocabulary_id}
     * @secure
     */
    dictionariesDelete: (userId: string, vocabularyId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${userId}/dictionaries/${vocabularyId}`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name LessonsCreate
     * @summary create or update score lesson
     * @request POST:/users/{user_id}/lessons
     * @secure
     */
    lessonsCreate: (userId: string, story: ModelsUserLesson, params: RequestParams = {}) =>
      this.request<ModelsUserLesson, ModelsValidationError | ModelsInternalError>({
        path: `/users/${userId}/lessons`,
        method: "POST",
        body: story,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name StoriesCreate
     * @summary doing a story
     * @request POST:/users/{user_id}/stories
     * @secure
     */
    storiesCreate: (userId: string, story: ModelsUserStory, params: RequestParams = {}) =>
      this.request<ModelsUserStory, ModelsValidationError | ModelsInternalError>({
        path: `/users/${userId}/stories`,
        method: "POST",
        body: story,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };



  vocabularies = {
    /**
     * @description Retrieve vocabulary entries that match the provided word.
     *
     * @tags vocabularies
     * @name VocabulariesList
     * @summary Search vocabularies by word
     * @request GET:/vocabularies
     * @secure
     */
    vocabulariesList: (
      query?: IVocabulariesRequest,
      params: RequestParams = {},
    ) =>
      this.request<ModelsPaginationWrapper, ModelsInternalError>({
        path: `/vocabularies`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };

}
