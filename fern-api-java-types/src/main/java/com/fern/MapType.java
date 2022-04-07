package com.fern;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fern.immutables.StagedBuilderStyle;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderStyle
@JsonDeserialize(as = ImmutableMapType.class)
public interface MapType {

    TypeReference keyType();

    TypeReference valueType();

    static ImmutableMapType.KeyTypeBuildStage builder() {
        return ImmutableMapType.builder();
    }
}
