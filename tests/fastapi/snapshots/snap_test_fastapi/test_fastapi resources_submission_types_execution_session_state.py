# This file was auto-generated by Fern from our API Definition.

from __future__ import annotations

import typing

import pydantic
import typing_extensions

from ...commons.types.language import Language
from .execution_session_status import ExecutionSessionStatus


class ExecutionSessionState(pydantic.BaseModel):
    last_time_contacted: typing.Optional[str] = pydantic.Field(alias="lastTimeContacted")
    session_id: str = pydantic.Field(
        alias="sessionId", description=("The auto-generated session id. Formatted as a uuid.\n")
    )
    is_warm_instance: bool = pydantic.Field(alias="isWarmInstance")
    aws_task_id: typing.Optional[str] = pydantic.Field(alias="awsTaskId")
    language: Language
    status: ExecutionSessionStatus

    class Partial(typing_extensions.TypedDict):
        last_time_contacted: typing_extensions.NotRequired[typing.Optional[str]]
        session_id: typing_extensions.NotRequired[str]
        is_warm_instance: typing_extensions.NotRequired[bool]
        aws_task_id: typing_extensions.NotRequired[typing.Optional[str]]
        language: typing_extensions.NotRequired[Language]
        status: typing_extensions.NotRequired[ExecutionSessionStatus]

    class Validators:
        """
        Use this class to add validators to the Pydantic model.

            @ExecutionSessionState.Validators.root()
            def validate(values: ExecutionSessionState.Partial) -> ExecutionSessionState.Partial:
                ...

            @ExecutionSessionState.Validators.field("last_time_contacted")
            def validate_last_time_contacted(last_time_contacted: typing.Optional[str], values: ExecutionSessionState.Partial) -> typing.Optional[str]:
                ...

            @ExecutionSessionState.Validators.field("session_id")
            def validate_session_id(session_id: str, values: ExecutionSessionState.Partial) -> str:
                ...

            @ExecutionSessionState.Validators.field("is_warm_instance")
            def validate_is_warm_instance(is_warm_instance: bool, values: ExecutionSessionState.Partial) -> bool:
                ...

            @ExecutionSessionState.Validators.field("aws_task_id")
            def validate_aws_task_id(aws_task_id: typing.Optional[str], values: ExecutionSessionState.Partial) -> typing.Optional[str]:
                ...

            @ExecutionSessionState.Validators.field("language")
            def validate_language(language: Language, values: ExecutionSessionState.Partial) -> Language:
                ...

            @ExecutionSessionState.Validators.field("status")
            def validate_status(status: ExecutionSessionStatus, values: ExecutionSessionState.Partial) -> ExecutionSessionStatus:
                ...
        """

        _pre_validators: typing.ClassVar[typing.List[ExecutionSessionState.Validators._RootValidator]] = []
        _post_validators: typing.ClassVar[typing.List[ExecutionSessionState.Validators._RootValidator]] = []
        _last_time_contacted_pre_validators: typing.ClassVar[
            typing.List[ExecutionSessionState.Validators.PreLastTimeContactedValidator]
        ] = []
        _last_time_contacted_post_validators: typing.ClassVar[
            typing.List[ExecutionSessionState.Validators.LastTimeContactedValidator]
        ] = []
        _session_id_pre_validators: typing.ClassVar[
            typing.List[ExecutionSessionState.Validators.PreSessionIdValidator]
        ] = []
        _session_id_post_validators: typing.ClassVar[
            typing.List[ExecutionSessionState.Validators.SessionIdValidator]
        ] = []
        _is_warm_instance_pre_validators: typing.ClassVar[
            typing.List[ExecutionSessionState.Validators.PreIsWarmInstanceValidator]
        ] = []
        _is_warm_instance_post_validators: typing.ClassVar[
            typing.List[ExecutionSessionState.Validators.IsWarmInstanceValidator]
        ] = []
        _aws_task_id_pre_validators: typing.ClassVar[
            typing.List[ExecutionSessionState.Validators.PreAwsTaskIdValidator]
        ] = []
        _aws_task_id_post_validators: typing.ClassVar[
            typing.List[ExecutionSessionState.Validators.AwsTaskIdValidator]
        ] = []
        _language_pre_validators: typing.ClassVar[
            typing.List[ExecutionSessionState.Validators.PreLanguageValidator]
        ] = []
        _language_post_validators: typing.ClassVar[typing.List[ExecutionSessionState.Validators.LanguageValidator]] = []
        _status_pre_validators: typing.ClassVar[typing.List[ExecutionSessionState.Validators.PreStatusValidator]] = []
        _status_post_validators: typing.ClassVar[typing.List[ExecutionSessionState.Validators.StatusValidator]] = []

        @classmethod
        def root(
            cls, *, pre: bool = False
        ) -> typing.Callable[
            [ExecutionSessionState.Validators._RootValidator], ExecutionSessionState.Validators._RootValidator
        ]:
            def decorator(
                validator: ExecutionSessionState.Validators._RootValidator,
            ) -> ExecutionSessionState.Validators._RootValidator:
                if pre:
                    cls._pre_validators.append(validator)
                else:
                    cls._post_validators.append(validator)
                return validator

            return decorator

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["last_time_contacted"], *, pre: typing_extensions.Literal[True]
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.PreLastTimeContactedValidator],
            ExecutionSessionState.Validators.PreLastTimeContactedValidator,
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls,
            field_name: typing_extensions.Literal["last_time_contacted"],
            *,
            pre: typing_extensions.Literal[False] = False,
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.LastTimeContactedValidator],
            ExecutionSessionState.Validators.LastTimeContactedValidator,
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["session_id"], *, pre: typing_extensions.Literal[True]
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.PreSessionIdValidator],
            ExecutionSessionState.Validators.PreSessionIdValidator,
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["session_id"], *, pre: typing_extensions.Literal[False] = False
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.SessionIdValidator], ExecutionSessionState.Validators.SessionIdValidator
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["is_warm_instance"], *, pre: typing_extensions.Literal[True]
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.PreIsWarmInstanceValidator],
            ExecutionSessionState.Validators.PreIsWarmInstanceValidator,
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls,
            field_name: typing_extensions.Literal["is_warm_instance"],
            *,
            pre: typing_extensions.Literal[False] = False,
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.IsWarmInstanceValidator],
            ExecutionSessionState.Validators.IsWarmInstanceValidator,
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["aws_task_id"], *, pre: typing_extensions.Literal[True]
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.PreAwsTaskIdValidator],
            ExecutionSessionState.Validators.PreAwsTaskIdValidator,
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["aws_task_id"], *, pre: typing_extensions.Literal[False] = False
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.AwsTaskIdValidator], ExecutionSessionState.Validators.AwsTaskIdValidator
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["language"], *, pre: typing_extensions.Literal[True]
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.PreLanguageValidator],
            ExecutionSessionState.Validators.PreLanguageValidator,
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["language"], *, pre: typing_extensions.Literal[False] = False
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.LanguageValidator], ExecutionSessionState.Validators.LanguageValidator
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["status"], *, pre: typing_extensions.Literal[True]
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.PreStatusValidator], ExecutionSessionState.Validators.PreStatusValidator
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["status"], *, pre: typing_extensions.Literal[False] = False
        ) -> typing.Callable[
            [ExecutionSessionState.Validators.StatusValidator], ExecutionSessionState.Validators.StatusValidator
        ]:
            ...

        @classmethod
        def field(cls, field_name: str, *, pre: bool = False) -> typing.Any:
            def decorator(validator: typing.Any) -> typing.Any:
                if field_name == "last_time_contacted":
                    if pre:
                        cls._last_time_contacted_pre_validators.append(validator)
                    else:
                        cls._last_time_contacted_post_validators.append(validator)
                if field_name == "session_id":
                    if pre:
                        cls._session_id_pre_validators.append(validator)
                    else:
                        cls._session_id_post_validators.append(validator)
                if field_name == "is_warm_instance":
                    if pre:
                        cls._is_warm_instance_pre_validators.append(validator)
                    else:
                        cls._is_warm_instance_post_validators.append(validator)
                if field_name == "aws_task_id":
                    if pre:
                        cls._aws_task_id_pre_validators.append(validator)
                    else:
                        cls._aws_task_id_post_validators.append(validator)
                if field_name == "language":
                    if pre:
                        cls._language_pre_validators.append(validator)
                    else:
                        cls._language_post_validators.append(validator)
                if field_name == "status":
                    if pre:
                        cls._status_pre_validators.append(validator)
                    else:
                        cls._status_post_validators.append(validator)
                return validator

            return decorator

        class PreLastTimeContactedValidator(typing_extensions.Protocol):
            def __call__(self, __v: typing.Any, __values: ExecutionSessionState.Partial) -> typing.Any:
                ...

        class LastTimeContactedValidator(typing_extensions.Protocol):
            def __call__(
                self, __v: typing.Optional[str], __values: ExecutionSessionState.Partial
            ) -> typing.Optional[str]:
                ...

        class PreSessionIdValidator(typing_extensions.Protocol):
            def __call__(self, __v: typing.Any, __values: ExecutionSessionState.Partial) -> typing.Any:
                ...

        class SessionIdValidator(typing_extensions.Protocol):
            def __call__(self, __v: str, __values: ExecutionSessionState.Partial) -> str:
                ...

        class PreIsWarmInstanceValidator(typing_extensions.Protocol):
            def __call__(self, __v: typing.Any, __values: ExecutionSessionState.Partial) -> typing.Any:
                ...

        class IsWarmInstanceValidator(typing_extensions.Protocol):
            def __call__(self, __v: bool, __values: ExecutionSessionState.Partial) -> bool:
                ...

        class PreAwsTaskIdValidator(typing_extensions.Protocol):
            def __call__(self, __v: typing.Any, __values: ExecutionSessionState.Partial) -> typing.Any:
                ...

        class AwsTaskIdValidator(typing_extensions.Protocol):
            def __call__(
                self, __v: typing.Optional[str], __values: ExecutionSessionState.Partial
            ) -> typing.Optional[str]:
                ...

        class PreLanguageValidator(typing_extensions.Protocol):
            def __call__(self, __v: typing.Any, __values: ExecutionSessionState.Partial) -> typing.Any:
                ...

        class LanguageValidator(typing_extensions.Protocol):
            def __call__(self, __v: Language, __values: ExecutionSessionState.Partial) -> Language:
                ...

        class PreStatusValidator(typing_extensions.Protocol):
            def __call__(self, __v: typing.Any, __values: ExecutionSessionState.Partial) -> typing.Any:
                ...

        class StatusValidator(typing_extensions.Protocol):
            def __call__(
                self, __v: ExecutionSessionStatus, __values: ExecutionSessionState.Partial
            ) -> ExecutionSessionStatus:
                ...

        class _RootValidator(typing_extensions.Protocol):
            def __call__(self, __values: ExecutionSessionState.Partial) -> ExecutionSessionState.Partial:
                ...

    @pydantic.root_validator(pre=True)
    def _pre_validate(cls, values: ExecutionSessionState.Partial) -> ExecutionSessionState.Partial:
        for validator in ExecutionSessionState.Validators._pre_validators:
            values = validator(values)
        return values

    @pydantic.root_validator(pre=False)
    def _post_validate(cls, values: ExecutionSessionState.Partial) -> ExecutionSessionState.Partial:
        for validator in ExecutionSessionState.Validators._post_validators:
            values = validator(values)
        return values

    @pydantic.validator("last_time_contacted", pre=True)
    def _pre_validate_last_time_contacted(
        cls, v: typing.Optional[str], values: ExecutionSessionState.Partial
    ) -> typing.Optional[str]:
        for validator in ExecutionSessionState.Validators._last_time_contacted_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("last_time_contacted", pre=False)
    def _post_validate_last_time_contacted(
        cls, v: typing.Optional[str], values: ExecutionSessionState.Partial
    ) -> typing.Optional[str]:
        for validator in ExecutionSessionState.Validators._last_time_contacted_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("session_id", pre=True)
    def _pre_validate_session_id(cls, v: str, values: ExecutionSessionState.Partial) -> str:
        for validator in ExecutionSessionState.Validators._session_id_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("session_id", pre=False)
    def _post_validate_session_id(cls, v: str, values: ExecutionSessionState.Partial) -> str:
        for validator in ExecutionSessionState.Validators._session_id_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("is_warm_instance", pre=True)
    def _pre_validate_is_warm_instance(cls, v: bool, values: ExecutionSessionState.Partial) -> bool:
        for validator in ExecutionSessionState.Validators._is_warm_instance_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("is_warm_instance", pre=False)
    def _post_validate_is_warm_instance(cls, v: bool, values: ExecutionSessionState.Partial) -> bool:
        for validator in ExecutionSessionState.Validators._is_warm_instance_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("aws_task_id", pre=True)
    def _pre_validate_aws_task_id(
        cls, v: typing.Optional[str], values: ExecutionSessionState.Partial
    ) -> typing.Optional[str]:
        for validator in ExecutionSessionState.Validators._aws_task_id_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("aws_task_id", pre=False)
    def _post_validate_aws_task_id(
        cls, v: typing.Optional[str], values: ExecutionSessionState.Partial
    ) -> typing.Optional[str]:
        for validator in ExecutionSessionState.Validators._aws_task_id_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("language", pre=True)
    def _pre_validate_language(cls, v: Language, values: ExecutionSessionState.Partial) -> Language:
        for validator in ExecutionSessionState.Validators._language_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("language", pre=False)
    def _post_validate_language(cls, v: Language, values: ExecutionSessionState.Partial) -> Language:
        for validator in ExecutionSessionState.Validators._language_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("status", pre=True)
    def _pre_validate_status(
        cls, v: ExecutionSessionStatus, values: ExecutionSessionState.Partial
    ) -> ExecutionSessionStatus:
        for validator in ExecutionSessionState.Validators._status_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("status", pre=False)
    def _post_validate_status(
        cls, v: ExecutionSessionStatus, values: ExecutionSessionState.Partial
    ) -> ExecutionSessionStatus:
        for validator in ExecutionSessionState.Validators._status_post_validators:
            v = validator(v, values)
        return v

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults: typing.Any = {"by_alias": True, **kwargs}
        return super().dict(**kwargs_with_defaults)

    class Config:
        frozen = True
        allow_population_by_field_name = True
        extra = pydantic.Extra.forbid
